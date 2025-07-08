const openaiService = require('./openai.service');

class AIService {
  /**
   * Método unificado para gerar conteúdo com qualquer assistente
   * @param {Object} payload - Dados estruturados (perguntas e respostas)
   * @param {Function} onChunk - Callback para receber chunks do stream
   * @param {string} assistantId - ID do assistente OpenAI específico
   * @returns {Promise<string>} - Conteúdo completo gerado
   */
  async generateStreamWithAssistant(payload, onChunk, assistantId) {
    try {
      if (!assistantId) {
        throw new Error('Assistant ID é obrigatório');
      }

      console.log('🤖 AI Service: Chamando OpenAI Assistant', assistantId);
      
      return await openaiService.generateStreamWithAssistant(
        payload,
        onChunk,
        assistantId
      );
    } catch (error) {
      console.error('Erro no AI Service:', error);
      throw error;
    }
  }

  /**
   * Método otimizado para gerar emails com prompt estruturado
   * @param {Object} answers - Respostas do questionário
   * @param {Array} questions - Perguntas do questionário
   * @param {Function} onChunk - Callback para receber chunks do stream
   * @param {string} assistantId - ID do assistente OpenAI específico
   * @param {Object} batchInfo - Informações do lote (opcional)
   * @returns {Promise<string>} - Conteúdo completo gerado
   */
  async generateStreamWithAssistantEnhanced(answers, questions, onChunk, assistantId, batchInfo = null) {
    try {
      if (!assistantId) {
        throw new Error('Assistant ID é obrigatório');
      }

      if (batchInfo) {
        console.log(`🚀 AI Service: Gerando lote ${batchInfo.batchNumber}/6`, assistantId);
      } else {
        console.log('🚀 AI Service: Gerando com prompt otimizado', assistantId);
      }
      
      return await openaiService.generateStreamWithAssistantEnhanced(
        answers,
        questions,
        onChunk,
        assistantId,
        batchInfo
      );
    } catch (error) {
      console.error('Erro no AI Service Enhanced:', error);
      throw error;
    }
  }
}

module.exports = new AIService();