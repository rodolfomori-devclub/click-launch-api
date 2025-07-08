const aiService = require('./ai.service');

class EmailsService {
  async generateEmailsStream(answers, questions, onChunk, batchInfo = null) {
    try {
      if (batchInfo) {
        console.log('📤 GERANDO EMAILS COM SISTEMA DE LOTES');
        console.log(`📊 Lote: ${batchInfo.batchNumber}/6, Emails: ${batchInfo.batchNumber === 6 ? '4' : '5'}`);
        console.log(`📋 Conteúdo anterior: ${batchInfo.previousContent ? 'SIM' : 'NÃO'}`);
      } else {
        console.log('📤 GERANDO EMAILS COM PROMPT OTIMIZADO (MODO COMPLETO)');
      }
      console.log(`📊 Perguntas: ${questions.length}, Respostas: ${Object.keys(answers).length}`);
      
      const assistantId = process.env.OPENAI_ASSISTANT_ID_EMAILS;
      if (!assistantId) {
        throw new Error('OPENAI_ASSISTANT_ID_EMAILS não configurado no .env');
      }
      
      // Passar answers, questions e batchInfo para o AI service
      return await aiService.generateStreamWithAssistantEnhanced(answers, questions, onChunk, assistantId, batchInfo);
    } catch (error) {
      console.error('Erro no EmailsService:', error);
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

  // Para debug - retorna informações sobre o prompt otimizado sem chamar a API
  debugFormat(answers, questions) {
    const { createEmailGenerationPrompt } = require('../prompts-reference/enhanced-email-prompt');
    const enhancedPrompt = createEmailGenerationPrompt(answers, questions);
    
    return {
      success: true,
      assistantId: process.env.OPENAI_ASSISTANT_ID_EMAILS,
      data: {
        method: 'Enhanced Prompt (usando frameworks anexados)',
        totalQuestions: questions.length,
        answeredQuestions: Object.keys(answers).length,
        completionRate: Math.round((Object.keys(answers).length / questions.length) * 100),
        promptSize: enhancedPrompt.length,
        promptPreview: enhancedPrompt.substring(0, 500) + '...',
        improvement: 'Agora usa prompt estruturado + frameworks anexados no assistente'
      }
    };
  }
}

module.exports = new EmailsService();