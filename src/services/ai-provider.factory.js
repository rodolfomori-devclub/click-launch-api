const ClaudeService = require('./claude.service');
const OpenAIEmailsService = require('./openai-emails.service');

/**
 * AI Provider Factory
 * Creates the appropriate AI service instance based on environment configuration
 */
class AIProviderFactory {
  /**
   * Create an AI service instance for email generation
   * @param {string} providerType - 'claude' or 'openai'
   * @returns {ClaudeService|OpenAIEmailsService} - AI service instance
   */
  static createEmailsProvider(providerType = null) {
    // Use environment variable if no provider specified
    const provider = providerType || process.env.AI_PROVIDER_EMAILS || process.env.AI_PROVIDER || 'claude';
    
    console.log(`[AI Provider Factory] Creating emails provider: ${provider}`);
    
    switch (provider.toLowerCase()) {
      case 'claude':
        console.log('[AI Provider Factory] Using Claude service for emails');
        return new ClaudeService();
        
      case 'openai':
        console.log('[AI Provider Factory] Using OpenAI service for emails');
        return new OpenAIEmailsService();
        
      default:
        console.warn(`[AI Provider Factory] Unknown provider: ${provider}, defaulting to Claude`);
        return new ClaudeService();
    }
  }

  /**
   * Get the current provider name for emails
   * @returns {string} - Provider name
   */
  static getCurrentEmailsProvider() {
    return process.env.AI_PROVIDER_EMAILS || process.env.AI_PROVIDER || 'claude';
  }

  /**
   * Check if a provider is available (has valid API keys)
   * @param {string} provider - Provider name ('claude' or 'openai')
   * @returns {boolean} - Whether the provider is available
   */
  static isProviderAvailable(provider) {
    switch (provider.toLowerCase()) {
      case 'claude':
        return !!process.env.CLAUDE_API_KEY;
        
      case 'openai':
        return !!process.env.OPENAI_API_KEY;
        
      default:
        return false;
    }
  }

  /**
   * Get available providers
   * @returns {Array<string>} - List of available providers
   */
  static getAvailableProviders() {
    const providers = [];
    
    if (this.isProviderAvailable('claude')) {
      providers.push('claude');
    }
    
    if (this.isProviderAvailable('openai')) {
      providers.push('openai');
    }
    
    return providers;
  }

  /**
   * Validate provider configuration
   * @param {string} provider - Provider name
   * @throws {Error} - If provider is not properly configured
   */
  static validateProvider(provider) {
    if (!this.isProviderAvailable(provider)) {
      const requiredEnvVar = provider === 'claude' ? 'CLAUDE_API_KEY' : 'OPENAI_API_KEY';
      throw new Error(`${provider.toUpperCase()} provider is not properly configured. Missing ${requiredEnvVar} environment variable.`);
    }
  }

  /**
   * Test provider connection
   * @param {string} provider - Provider name
   * @returns {Promise<boolean>} - Whether the provider connection works
   */
  static async testProvider(provider) {
    try {
      this.validateProvider(provider);
      const service = this.createEmailsProvider(provider);
      
      if (typeof service.testConnection === 'function') {
        return await service.testConnection();
      }
      
      // If no test method available, assume it's working if API key exists
      return true;
    } catch (error) {
      console.error(`[AI Provider Factory] Provider test failed for ${provider}:`, error.message);
      return false;
    }
  }

  /**
   * Get provider configuration info
   * @returns {object} - Provider configuration information
   */
  static getProviderInfo() {
    const currentProvider = this.getCurrentEmailsProvider();
    const availableProviders = this.getAvailableProviders();
    
    return {
      current: currentProvider,
      available: availableProviders,
      isCurrentAvailable: this.isProviderAvailable(currentProvider),
      configurations: {
        claude: {
          apiKey: process.env.CLAUDE_API_KEY ? 'Configured' : 'Missing',
          model: process.env.CLAUDE_MODEL || 'claude-3-5-sonnet-20241022',
          maxTokens: process.env.CLAUDE_MAX_TOKENS || '8192'
        },
        openai: {
          apiKey: process.env.OPENAI_API_KEY ? 'Configured' : 'Missing',
          model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
          maxTokens: process.env.OPENAI_MAX_TOKENS || '4000'
        }
      }
    };
  }
}

module.exports = AIProviderFactory;