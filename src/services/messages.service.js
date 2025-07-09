const claudeService = require('./claude.service');
const { getPhaseOrder, getPreviousPhases } = require('../data/messages-phases');
const { getMessageNumbersByPhase } = require('../data/messages-templates');

class MessagesService {
  constructor() {
    this.phaseContexts = {}; // Store context between phases
  }

  async generateMessage(type, context) {
    try {
      // Legacy method - redirect to Claude
      return await claudeService.generateIndividualMessage(1, context, '');
    } catch (error) {
      console.error('Erro no MessagesService:', error);
      throw error;
    }
  }

  async generatePhaseWithClaude(phase, answers, questions, existingContent, onChunk) {
    try {
      const questionsAndAnswers = this.formatQuestionsAndAnswers(answers, questions);
      
      console.log(`📤 Gerando fase específica com Claude: ${phase}`);
      
      // Get context from previous phases
      const previousPhases = getPreviousPhases(phase);
      let previousContext = '';
      
      previousPhases.forEach(prevPhase => {
        if (this.phaseContexts[prevPhase]) {
          previousContext += `${prevPhase}: ${this.phaseContexts[prevPhase].summary}\n`;
        }
      });

      // Generate messages for this phase in batches
      const phaseContent = await claudeService.generateMessagesInBatches(
        phase,
        questionsAndAnswers,
        onChunk,
        3 // Batch size of 3 messages
      );

      // Store context for next phases
      this.phaseContexts[phase] = this.generatePhaseContext(phase, phaseContent);
      
      return phaseContent;
    } catch (error) {
      console.error('Erro na geração de fase específica:', error);
      throw error;
    }
  }

  async generateAllPhasesWithClaude(answers, questions, existingContent, onChunk) {
    try {
      const questionsAndAnswers = this.formatQuestionsAndAnswers(answers, questions);
      const phases = getPhaseOrder();
      let allContent = '';
      
      console.log(`📤 Gerando todas as fases sequencialmente com Claude: ${phases.join(', ')}`);
      
      for (const phase of phases) {
        console.log(`📱 Iniciando fase: ${phase}`);
        
        // Send phase progress to frontend
        if (onChunk) {
          onChunk(`\n\n🎯 === INICIANDO FASE: ${phase.toUpperCase()} ===\n\n`);
        }
        
        // Get context from previous phases
        const previousPhases = getPreviousPhases(phase);
        let previousContext = '';
        
        previousPhases.forEach(prevPhase => {
          if (this.phaseContexts[prevPhase]) {
            previousContext += `${prevPhase}: ${this.phaseContexts[prevPhase].summary}\n`;
          }
        });

        // Generate messages for this phase in batches
        const phaseContent = await claudeService.generateMessagesInBatches(
          phase,
          questionsAndAnswers,
          onChunk,
          3 // Batch size of 3 messages
        );

        // Store context for next phases
        this.phaseContexts[phase] = this.generatePhaseContext(phase, phaseContent);
        
        allContent += phaseContent;
        
        console.log(`✅ Fase ${phase} concluída`);
        
        if (onChunk) {
          onChunk(`\n✅ FASE ${phase.toUpperCase()} CONCLUÍDA\n`);
        }
      }
      
      return allContent;
    } catch (error) {
      console.error('Erro na geração de todas as fases:', error);
      throw error;
    }
  }

  /**
   * Generate specific messages by numbers
   */
  async generateSpecificMessages(messageNumbers, answers, questions, onChunk) {
    try {
      const questionsAndAnswers = this.formatQuestionsAndAnswers(answers, questions);
      let allContent = '';
      let previousContext = '';
      
      console.log(`📤 Gerando mensagens específicas: ${messageNumbers.join(', ')}`);
      
      for (const messageNumber of messageNumbers) {
        if (onChunk) {
          onChunk(`\n--- Gerando Mensagem ${messageNumber} ---\n`);
        }

        const messageContent = await claudeService.generateIndividualMessageStream(
          messageNumber,
          questionsAndAnswers,
          previousContext,
          onChunk
        );

        allContent += messageContent + '\n\n';
        
        // Update context for next messages
        previousContext += `Mensagem ${messageNumber}: ${messageContent.substring(0, 200)}...\n`;
        
        if (onChunk) {
          onChunk(`\n✅ Mensagem ${messageNumber} concluída\n`);
        }
      }
      
      return allContent;
    } catch (error) {
      console.error('Erro na geração de mensagens específicas:', error);
      throw error;
    }
  }

  generatePhaseContext(phase, content) {
    // Extract key information from generated content to use as context for next phases
    const lines = content.split('\n').filter(line => line.trim());
    const summary = lines.slice(0, 5).join(' '); // First 5 lines as summary
    
    return {
      phase,
      summary,
      messageCount: this.countMessages(content),
      completedAt: new Date().toISOString()
    };
  }

  countMessages(content) {
    // Count how many messages were generated by looking for message separators
    const messagePatterns = [
      /MENSAGEM \d+/gi,
      /Mensagem \d+/gi,
      /--- Mensagem \d+ ---/gi
    ];
    
    let totalCount = 0;
    messagePatterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        totalCount = Math.max(totalCount, matches.length);
      }
    });
    
    return totalCount || 1;
  }

  formatQuestionsAndAnswers(answers, questions) {
    const payload = {};
    
    questions.forEach((question, index) => {
      const questionKey = `question${String(index + 1).padStart(2, '0')}`;
      const answerKey = `answer${String(index + 1).padStart(2, '0')}`;
      
      payload[questionKey] = question.question;
      payload[answerKey] = answers[question.id] || '';
    });
    
    return payload;
  }

  // Legacy method for compatibility
  async generateMessagesStream(answers, questions, existingContent, onChunk) {
    try {
      return await this.generateAllPhasesWithClaude(answers, questions, existingContent, onChunk);
    } catch (error) {
      console.error('Erro no MessagesService (legacy):', error);
      throw error;
    }
  }

  // For debug - returns apenas o payload formatado sem chamar a API
  debugFormat(answers, questions) {
    const payload = this.formatQuestionsAndAnswers(answers, questions);
    
    return {
      success: true,
      provider: 'claude',
      data: {
        payload,
        totalQuestions: questions.length,
        answeredQuestions: Object.keys(answers).length,
        completionRate: Math.round((Object.keys(answers).length / questions.length) * 100),
        payloadSize: JSON.stringify(payload).length,
        availablePhases: getPhaseOrder(),
        totalMessages: this.getTotalMessagesCount()
      }
    };
  }

  getTotalMessagesCount() {
    const phases = getPhaseOrder();
    let total = 0;
    
    phases.forEach(phase => {
      try {
        const messageNumbers = getMessageNumbersByPhase(phase);
        total += messageNumbers.length;
      } catch (error) {
        // Phase might not have messages yet
      }
    });
    
    return total;
  }
}

module.exports = new MessagesService();