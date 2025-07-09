const ClaudeService = require('./claude.service');
const { getAllPhases, getPhaseOrder, getPreviousPhases } = require('../data/launch-phases');

class EmailsService {
  constructor() {
    this.claudeService = new ClaudeService();
    this.phaseContexts = {}; // Store context from completed phases
  }

  async generateEmailsStream(answers, questions, onChunk, batchInfo = null, phase = null) {
    try {
      console.log(`📤 GERANDO EMAILS COM CLAUDE`);
      console.log(`📊 Perguntas: ${questions.length}, Respostas: ${Object.keys(answers).length}`);
      
      // Single phase generation
      if (phase) {
        console.log(`🎯 Gerando fase específica: ${phase}`);
        return await this.generatePhaseWithClaude(answers, questions, phase, onChunk);
      }
      
      // Se não tem fase específica, assume que é geração completa
      // Mas agora vamos gerar apenas a primeira fase e deixar o frontend controlar a sequência
      console.log(`🚀 Iniciando geração sequencial - Fase 1 (pre-launch)`);
      return await this.generatePhaseWithClaude(answers, questions, 'pre-launch', onChunk);
      
    } catch (error) {
      console.error('Erro no EmailsService:', error);
      throw error;
    }
  }

  async generatePhaseWithClaude(answers, questions, phase, onChunk) {
    try {
      // Format questions and answers for Claude
      const questionsAndAnswers = this.formatQuestionsAndAnswers(answers, questions);
      
      // Get context from previous phases
      const previousPhases = getPreviousPhases(phase);
      const previousPhasesContext = {};
      
      previousPhases.forEach(prevPhase => {
        if (this.phaseContexts[prevPhase]) {
          previousPhasesContext[prevPhase] = this.phaseContexts[prevPhase];
        }
      });

      // Generate emails for this phase
      const generatedContent = await this.claudeService.generateEmailsForPhaseStream(
        phase,
        questionsAndAnswers,
        previousPhasesContext,
        onChunk
      );

      // Store context for next phases
      this.phaseContexts[phase] = this.claudeService.generatePhaseContext(phase, generatedContent);

      return generatedContent;
    } catch (error) {
      console.error(`Erro na geração da fase ${phase}:`, error);
      throw error;
    }
  }

  async generateAllPhasesWithClaude(answers, questions, onChunk) {
    try {
      const questionsAndAnswers = this.formatQuestionsAndAnswers(answers, questions);
      const phases = getPhaseOrder();
      let allContent = '';
      
      console.log(`📤 Gerando todas as fases sequencialmente com Claude: ${phases.join(', ')}`);
      
      for (const phase of phases) {
        console.log(`📧 Iniciando fase: ${phase}`);
        
        // Send phase progress to frontend
        if (onChunk) {
          onChunk(`\n\n=== INICIANDO FASE: ${phase.toUpperCase()} ===\n\n`);
        }
        
        // Get context from previous phases
        const previousPhases = getPreviousPhases(phase);
        const previousPhasesContext = {};
        
        previousPhases.forEach(prevPhase => {
          if (this.phaseContexts[prevPhase]) {
            previousPhasesContext[prevPhase] = this.phaseContexts[prevPhase];
          }
        });

        // Generate emails for this phase
        const phaseContent = await this.claudeService.generateEmailsForPhaseStream(
          phase,
          questionsAndAnswers,
          previousPhasesContext,
          onChunk
        );

        // Store context for next phases
        this.phaseContexts[phase] = this.claudeService.generatePhaseContext(phase, phaseContent);
        
        allContent += phaseContent;
        
        console.log(`✅ Fase ${phase} concluída`);
      }
      
      return allContent;
    } catch (error) {
      console.error('Erro na geração de todas as fases:', error);
      throw error;
    }
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

  // Para debug - retorna informações sobre o sistema Claude por fases
  debugFormat(answers, questions) {
    const questionsAndAnswers = this.formatQuestionsAndAnswers(answers, questions);
    const phases = getAllPhases();
    
    return {
      success: true,
      provider: 'claude',
      data: {
        method: 'Claude Phase-based Generation System',
        totalQuestions: questions.length,
        answeredQuestions: Object.keys(answers).length,
        completionRate: Math.round((Object.keys(answers).length / questions.length) * 100),
        phases: phases.length,
        phaseNames: phases.map(p => p.name),
        totalEmails: phases.reduce((sum, p) => sum + p.emails.length, 0),
        model: process.env.CLAUDE_MODEL || 'claude-3-5-sonnet-20241022',
        improvement: 'Sistema de fases com 80% menos tokens e melhor coerência narrativa'
      }
    };
  }
}

module.exports = new EmailsService();