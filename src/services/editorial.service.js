const aiService = require('./ai.service');

class EditorialService {
  async generateEditorialAnalysisStream(answers, questions, onChunk) {
    try {
      // Preparar payload estruturado: pergunta + resposta
      const payload = this.formatQuestionsAndAnswers(answers, questions);
      
      console.log('📤 PAYLOAD ENVIADO PARA OPENAI (EDITORIAL):');
      console.log(JSON.stringify(payload, null, 2));
      
      const assistantId = process.env.OPENAI_ASSISTANT_ID_EDITORIAL;
      if (!assistantId) {
        throw new Error('OPENAI_ASSISTANT_ID_EDITORIAL não configurado no .env');
      }
      
      return await aiService.generateStreamWithAssistant(payload, onChunk, assistantId);
    } catch (error) {
      console.error('Erro no EditorialService:', error);
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

  // Para debug - retorna apenas o payload formatado sem chamar a API
  debugFormat(answers, questions) {
    const payload = this.formatQuestionsAndAnswers(answers, questions);
    
    return {
      success: true,
      assistantId: process.env.OPENAI_ASSISTANT_ID_EDITORIAL,
      data: {
        payload,
        totalQuestions: questions.length,
        answeredQuestions: Object.keys(answers).length,
        completionRate: Math.round((Object.keys(answers).length / questions.length) * 100),
        payloadSize: JSON.stringify(payload).length
      }
    };
  }
}

module.exports = new EditorialService();