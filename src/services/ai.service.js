const ClaudeService = require('./claude.service');

class AIService {
  constructor() {
    this.claudeService = new ClaudeService();
  }

  /**
   * Método unificado para gerar conteúdo com Claude
   * @param {Object} payload - Dados estruturados (perguntas e respostas)
   * @param {Function} onChunk - Callback para receber chunks do stream
   * @returns {Promise<string>} - Conteúdo completo gerado
   */
  async generateStreamWithAssistant(payload, onChunk) {
    try {
      console.log('🤖 AI Service: Chamando Claude API');
      
      // Generate all phases with Claude
      const { getAllPhases } = require('../data/launch-phases');
      const phases = getAllPhases();
      
      return await this.claudeService.generateEmailsForPhaseStream(
        'all-phases',
        payload,
        {},
        onChunk
      );
    } catch (error) {
      console.error('Erro no AI Service:', error);
      throw error;
    }
  }

  /**
   * Test Claude connection
   * @returns {Promise<boolean>} - Connection status
   */
  async testConnection() {
    try {
      console.log('🧪 Testing Claude connection...');
      return await this.claudeService.testConnection();
    } catch (error) {
      console.error('Error testing Claude connection:', error);
      return false;
    }
  }
}

module.exports = new AIService();