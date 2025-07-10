const AIProviderFactory = require('./ai-provider.factory');
const { getAllPhases, getPhaseOrder, getPreviousPhases } = require('../data/launch-phases');

class EmailsService {
  constructor() {
    this.aiService = AIProviderFactory.createEmailsProvider();
    this.phaseContexts = {}; // Store context from completed phases
    this.currentProvider = AIProviderFactory.getCurrentEmailsProvider();
    
    console.log(`[EmailsService] Initialized with provider: ${this.currentProvider}`);
  }

  async generateEmailsStream(answers, questions, onChunk, batchInfo = null, phase = null) {
    try {
      console.log(`📤 GERANDO EMAILS COM ${this.currentProvider.toUpperCase()}`);
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
      const generatedContent = await this.aiService.generateEmailsForPhaseStream(
        phase,
        questionsAndAnswers,
        previousPhasesContext,
        onChunk
      );

      // Store context for next phases
      this.phaseContexts[phase] = this.aiService.generatePhaseContext(phase, generatedContent);

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
        const phaseContent = await this.aiService.generateEmailsForPhaseStream(
          phase,
          questionsAndAnswers,
          previousPhasesContext,
          onChunk
        );

        // Store context for next phases
        this.phaseContexts[phase] = this.aiService.generatePhaseContext(phase, phaseContent);
        
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

  // Para debug - retorna informações sobre o sistema AI por fases
  debugFormat(answers, questions) {
    const questionsAndAnswers = this.formatQuestionsAndAnswers(answers, questions);
    const phases = getAllPhases();
    const providerInfo = AIProviderFactory.getProviderInfo();
    
    return {
      success: true,
      provider: this.currentProvider,
      data: {
        method: `${this.currentProvider.toUpperCase()} Phase-based Generation System`,
        totalQuestions: questions.length,
        answeredQuestions: Object.keys(answers).length,
        completionRate: Math.round((Object.keys(answers).length / questions.length) * 100),
        phases: phases.length,
        phaseNames: phases.map(p => p.name),
        totalEmails: phases.reduce((sum, p) => sum + p.emails.length, 0),
        model: providerInfo.configurations[this.currentProvider]?.model || 'Unknown',
        maxTokens: providerInfo.configurations[this.currentProvider]?.maxTokens || 'Unknown',
        improvement: 'Sistema de fases com 80% menos tokens e melhor coerência narrativa',
        availableProviders: providerInfo.available,
        providerConfig: providerInfo.configurations[this.currentProvider]
      }
    };
  }
}

module.exports = new EmailsService();