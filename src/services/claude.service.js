const Anthropic = require('@anthropic-ai/sdk');
const { getMessageTemplate, getTemplatesByPhase } = require('../data/message-templates');
const { MESSAGES_PHASES, getMessagesByPhase, getPhaseForMessage, getPreviousPhases } = require('../data/messages-phases');

/**
 * Claude Service for Messages Generation
 * Handles phase-based message generation using Anthropic Claude API
 */
class ClaudeService {
  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.CLAUDE_API_KEY,
    });
    this.model = process.env.CLAUDE_MODEL || 'claude-3-5-sonnet-20241022';
  }

  /**
   * Generate messages for a specific phase/lote
   * @param {string} phase - The phase/lote to generate messages for (lote1, lote2, etc.)
   * @param {object} questionsAndAnswers - User's answers to the questionnaire
   * @param {object} previousPhasesContext - Context from previous phases
   * @returns {Promise<string>} - Generated messages content
   */
  async generateMessagesForPhase(phase, questionsAndAnswers, previousPhasesContext = {}) {
    const startTime = Date.now();
    
    try {
      this.validateInputs(phase, questionsAndAnswers);
      
      const templates = getTemplatesByPhase(phase);
      const prompt = this.buildPhasePrompt(phase, templates, questionsAndAnswers, previousPhasesContext);

      console.log(`[Claude Service] Starting generation for phase: ${phase}`);
      console.log(`[Claude Service] Messages in phase: ${templates.map(t => t.number).join(', ')}`);
      console.log(`[Claude Service] Prompt length: ${prompt.length} characters`);

      const response = await this.anthropic.messages.create({
        model: this.model,
        max_tokens: 8000,
        temperature: 0.7,
        system: this.getSystemPrompt(),
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      });

      const generatedContent = response.content[0].text;
      const duration = Date.now() - startTime;
      
      console.log(`[Claude Service] Generated content length: ${generatedContent.length} characters`);
      console.log(`[Claude Service] Generation completed in ${duration}ms`);
      
      return generatedContent;
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`[Claude Service] Error generating messages for phase ${phase} after ${duration}ms:`, {
        error: error.message,
        phase,
        stack: error.stack
      });
      
      this.handleError(error, `generation for phase ${phase}`);
    }
  }

  /**
   * Generate messages for a specific phase with streaming support and retry mechanism
   * @param {string} phase - The phase to generate messages for
   * @param {object} questionsAndAnswers - User's answers to the questionnaire
   * @param {object} previousPhasesContext - Context from previous phases
   * @param {function} onChunk - Callback for each chunk of data
   * @param {number} maxRetries - Maximum number of retry attempts
   * @returns {Promise<string>} - Complete generated content
   */
  async generateMessagesForPhaseStream(phase, questionsAndAnswers, previousPhasesContext = {}, onChunk, maxRetries = 5) {
    return this.executeWithRetry(async (attempt) => {
      const startTime = Date.now();
      let streamStarted = false;
      
      try {
        this.validateInputs(phase, questionsAndAnswers);
        
        const templates = getTemplatesByPhase(phase);
        const prompt = this.buildPhasePrompt(phase, templates, questionsAndAnswers, previousPhasesContext);

        console.log(`[Claude Service] Starting streaming generation for phase: ${phase} (attempt ${attempt}/${maxRetries})`);
        console.log(`[Claude Service] Messages in phase: ${templates.map(t => t.number).join(', ')}`);
        console.log(`[Claude Service] Prompt length: ${prompt.length} characters`);

        const stream = await this.anthropic.messages.stream({
          model: this.model,
          max_tokens: 8000,
          temperature: 0.7,
          system: this.getSystemPrompt(),
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        });

        streamStarted = true;
        let completeContent = '';
        let chunkCount = 0;

        for await (const chunk of stream) {
          if (chunk.type === 'content_block_delta' && chunk.delta.text) {
            const text = chunk.delta.text;
            completeContent += text;
            chunkCount++;
            
            if (onChunk) {
              try {
                onChunk(text);
              } catch (chunkError) {
                console.warn(`[Claude Service] Error in chunk callback:`, chunkError.message);
              }
            }
          }
        }

        const duration = Date.now() - startTime;
        console.log(`[Claude Service] Streaming completed. Total length: ${completeContent.length} characters`);
        console.log(`[Claude Service] Processed ${chunkCount} chunks in ${duration}ms`);
        
        return completeContent;
      } catch (error) {
        const duration = Date.now() - startTime;
        console.error(`[Claude Service] Error in streaming generation for phase ${phase} after ${duration}ms (attempt ${attempt}/${maxRetries}):`, {
          error: error.message,
          phase,
          streamStarted,
          stack: error.stack
        });
        
        // Check if this is a retryable error
        if (this.isRetryableError(error)) {
          throw error; // This will be caught by executeWithRetry
        } else {
          // Non-retryable error, handle immediately
          this.handleError(error, `streaming generation for phase ${phase}`);
        }
      }
    }, maxRetries, phase);
  }

  /**
   * Generate individual WhatsApp message
   * @param {number} messageNumber - The message number (1-70)
   * @param {object} questionsAndAnswers - User's answers to the questionnaire  
   * @param {string} previousContext - Context from previous messages
   * @returns {Promise<string>} - Generated message
   */
  async generateIndividualMessage(messageNumber, questionsAndAnswers, previousContext = '') {
    const startTime = Date.now();
    
    try {
      const template = getMessageTemplate(messageNumber);
      const prompt = this.buildIndividualMessagePrompt(messageNumber, template, questionsAndAnswers, previousContext);

      console.log(`[Claude Service] Generating individual message ${messageNumber}: ${template.name}`);

      const response = await this.anthropic.messages.create({
        model: this.model,
        max_tokens: 1500,
        temperature: 0.7,
        system: this.getIndividualMessageSystemPrompt(),
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      });

      const generatedContent = response.content[0].text;
      const duration = Date.now() - startTime;
      
      console.log(`[Claude Service] Individual message ${messageNumber} generated in ${duration}ms`);
      
      return generatedContent;
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`[Claude Service] Error generating individual message ${messageNumber} after ${duration}ms:`, {
        error: error.message,
        messageNumber,
        stack: error.stack
      });
      
      this.handleError(error, `individual message generation for message ${messageNumber}`);
    }
  }

  /**
   * Generate individual WhatsApp message with streaming
   */
  async generateIndividualMessageStream(messageNumber, questionsAndAnswers, previousContext, onChunk) {
    const template = getMessageTemplate(messageNumber);
    const prompt = this.buildIndividualMessagePrompt(messageNumber, template, questionsAndAnswers, previousContext);
    
    console.log(`[Claude Service] Streaming individual message ${messageNumber}: ${template.name}`);

    const stream = await this.anthropic.messages.stream({
      model: this.model,
      max_tokens: 1500,
      temperature: 0.7,
      system: this.getIndividualMessageSystemPrompt(),
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    let fullContent = '';
    
    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta.text) {
        const text = chunk.delta.text;
        fullContent += text;
        if (onChunk) {
          onChunk(text);
        }
      }
    }
    
    return fullContent;
  }

  /**
   * Generate messages in batches for better performance
   * @param {string} phase - The phase to generate messages for
   * @param {object} questionsAndAnswers - User's answers
   * @param {function} onChunk - Callback for streaming data
   * @param {number} batchSize - Number of messages per batch
   */
  async generateMessagesInBatches(phase, questionsAndAnswers, onChunk, batchSize = 3) {
    const templates = getTemplatesByPhase(phase);
    const messages = templates.map(t => t.number);
    
    console.log(`[Claude Service] Generating ${messages.length} messages in batches of ${batchSize}`);
    
    let allResults = [];
    let previousContext = '';
    
    // Process messages in batches
    for (let i = 0; i < messages.length; i += batchSize) {
      const batch = messages.slice(i, i + batchSize);
      const batchNumber = Math.floor(i / batchSize) + 1;
      const totalBatches = Math.ceil(messages.length / batchSize);
      
      console.log(`[Claude Service] Processing batch ${batchNumber}/${totalBatches}: messages ${batch.join(', ')}`);
      
      // Send batch start info
      if (onChunk) {
        onChunk(`\n=== LOTE ${batchNumber}/${totalBatches} - MENSAGENS ${batch.join(', ')} ===\n\n`);
      }
      
      // Generate each message in the batch
      for (const messageNumber of batch) {
        const template = getMessageTemplate(messageNumber);
        
        if (onChunk) {
          onChunk(`**MENSAGEM ${messageNumber}: ${template.name.toUpperCase()}**\n\n`);
        }
        
        try {
          const result = await this.generateIndividualMessageStream(
            messageNumber, 
            questionsAndAnswers, 
            previousContext,
            onChunk
          );
          
          allResults.push({
            messageNumber,
            name: template.name,
            content: result
          });
          
          // Update context for next message
          previousContext += `\nMensagem ${messageNumber} (${template.name}): ${result.substring(0, 200)}...\n`;
          
          if (onChunk) {
            onChunk(`\n\n---\n\n`);
          }
          
        } catch (error) {
          console.error(`[Claude Service] Error in batch processing for message ${messageNumber}:`, error);
          if (onChunk) {
            onChunk(`\n❌ Erro ao gerar mensagem ${messageNumber}: ${error.message}\n\n`);
          }
        }
      }
      
      // Add delay between batches (except for the last batch)
      if (i + batchSize < messages.length) {
        if (onChunk) {
          onChunk(`\n🔄 Processando próximo lote...\n\n`);
        }
        await this.sleep(2000);
      }
    }
    
    return allResults;
  }

  /**
   * Build phase prompt for multiple messages generation
   */
  buildPhasePrompt(phase, templates, questionsAndAnswers, previousPhasesContext) {
    const phaseInfo = MESSAGES_PHASES[phase];
    
    const prompt = `
GERAÇÃO DE MENSAGENS PARA LANÇAMENTO - ${phaseInfo.name.toUpperCase()}

CONTEXTO DO LOTE:
${phaseInfo.description}
Objetivo: ${phaseInfo.context}

INSTRUÇÕES GERAIS:
Você deve gerar ${templates.length} mensagens de WhatsApp para este lote, cada uma seguindo as instruções específicas de seu template.

QUESTIONÁRIO RESPONDIDO:
${this.formatQuestionsAndAnswers(questionsAndAnswers)}

${Object.keys(previousPhasesContext).length > 0 ? 
  `CONTEXTO DOS LOTES ANTERIORES:\n${this.formatPreviousPhasesContext(previousPhasesContext)}\n` : 
  ''
}

MENSAGENS PARA GERAR:

${templates.map((template, index) => `
MENSAGEM ${template.number}: ${template.template.name.toUpperCase()}
Tema: ${template.template.tema}
Objetivo: ${template.template.objetivo}
Timing: ${template.template.timing}
Elementos: ${template.template.elementos.join(', ')}

INSTRUÇÕES ESPECÍFICAS:
${template.template.prompt}

${index < templates.length - 1 ? '---' : ''}
`).join('\n')}

FORMATO DE RESPOSTA:
Para cada mensagem, use este formato exato:

**MENSAGEM [NÚMERO]: [NOME DA MENSAGEM]**

[Conteúdo da mensagem aqui]

---

Mantenha consistência entre as mensagens e use as informações do questionário para personalizar cada uma.
`;

    return prompt;
  }

  /**
   * Get system prompt for Claude
   * @returns {string} - System prompt
   */
  getSystemPrompt() {
    return `Você é um especialista em marketing digital e copywriting, especializado em sequências de e-mail para lançamentos de produtos digitais. Sua tarefa é gerar emails de alta qualidade para campanhas de lançamento, seguindo templates específicos e personalizando com base nas informações fornecidas.

Características importantes:
- Você domina técnicas de persuasão e copywriting
- Entende profundamente a psicologia do consumidor
- Sabe criar senso de urgência e escassez
- Personaliza cada email com base no nicho e público-alvo
- Mantém consistência narrativa ao longo da sequência
- Usa linguagem natural e envolvente
- Aplica gatilhos mentais apropriados para cada fase

Sempre substitua os placeholders pelos dados reais fornecidos no questionário, mantendo o tom e estrutura dos templates.`;
  }

  /**
   * Format questions and answers for the prompt
   * @param {object} questionsAndAnswers - User's answers
   * @returns {string} - Formatted Q&A text
   */
  formatQuestionsAndAnswers(questionsAndAnswers) {
    if (!questionsAndAnswers || typeof questionsAndAnswers !== 'object') {
      return 'Nenhuma informação do questionário fornecida.';
    }

    let formatted = '';
    
    Object.entries(questionsAndAnswers).forEach(([key, value]) => {
      if (value && value.toString().trim()) {
        // Convert camelCase to readable format
        const readableKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        formatted += `**${readableKey}**: ${value}\n`;
      }
    });

    return formatted || 'Nenhuma informação específica fornecida.';
  }

  /**
   * Format previous phases context
   * @param {object} previousPhasesContext - Context from previous phases
   * @returns {string} - Formatted context
   */
  formatPreviousPhasesContext(previousPhasesContext) {
    let formatted = '';
    
    Object.entries(previousPhasesContext).forEach(([phase, context]) => {
      formatted += `### Fase: ${phase}\n`;
      formatted += `${context.summary || 'Resumo não disponível'}\n\n`;
    });

    return formatted || 'Nenhum contexto de fases anteriores.';
  }

  /**
   * Generate context summary for a phase (to be used in subsequent phases)
   * @param {string} phase - The phase name
   * @param {string} generatedContent - The generated content for this phase
   * @returns {object} - Context summary
   */
  generatePhaseContext(phase, generatedContent) {
    try {
      // Extract key information from generated content
      const emailCount = (generatedContent.match(/EMAIL \d+/g) || []).length;
      const wordCount = generatedContent.split(/\s+/).length;
      
      return {
        phase,
        emailCount,
        wordCount,
        summary: `Fase ${phase} completada com ${emailCount} emails gerados. Conteúdo focado em ${this.getPhaseDescription(phase)}.`,
        generatedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error(`[Claude Service] Error generating context for phase ${phase}:`, error);
      return {
        phase,
        summary: `Fase ${phase} completada.`,
        generatedAt: new Date().toISOString()
      };
    }
  }

  /**
   * Get description for a phase
   * @param {string} phase - The phase name
   * @returns {string} - Phase description
   */
  getPhaseDescription(phase) {
    const descriptions = {
      'pre-launch': 'confirmação de inscrição e preparação inicial',
      'event': 'condução do evento educacional e construção de autoridade',
      'pre-sales': 'preparação para vendas e criação de lista VIP',
      'sales': 'período ativo de vendas com urgência crescente',
      'post-sales': 'captura de vendas perdidas e facilidades de pagamento'
    };
    
    return descriptions[phase] || 'atividades da fase';
  }

  /**
   * Test Claude connection
   * @returns {Promise<boolean>} - Whether Claude is accessible
   */
  async testConnection() {
    try {
      console.log('[Claude Service] Testing connection...');
      
      const response = await this.anthropic.messages.create({
        model: this.model,
        max_tokens: 50,
        messages: [
          {
            role: 'user',
            content: 'Teste de conexão. Responda apenas "OK".'
          }
        ]
      });

      const success = response.content[0].text.includes('OK');
      console.log(`[Claude Service] Connection test ${success ? 'passed' : 'failed'}`);
      
      return success;
    } catch (error) {
      console.error('[Claude Service] Connection test failed:', {
        error: error.message,
        status: error.status,
        stack: error.stack
      });
      return false;
    }
  }

  /**
   * Validate inputs for email generation
   * @param {string} phase - The phase to generate emails for
   * @param {object} questionsAndAnswers - User's answers to the questionnaire
   */
  validateInputs(phase, questionsAndAnswers) {
    if (!phase || typeof phase !== 'string') {
      throw new Error('Phase is required and must be a string');
    }

    if (!questionsAndAnswers || typeof questionsAndAnswers !== 'object') {
      throw new Error('Questions and answers object is required');
    }

    if (!process.env.CLAUDE_API_KEY) {
      throw new Error('CLAUDE_API_KEY is not configured in environment variables');
    }

    console.log(`[Claude Service] Input validation passed for phase: ${phase}`);
  }

  /**
   * Execute function with retry logic and exponential backoff
   * @param {Function} fn - Function to execute
   * @param {number} maxRetries - Maximum number of retries
   * @param {string} context - Context for logging
   * @returns {Promise<any>} - Result of the function
   */
  async executeWithRetry(fn, maxRetries = 3, context = 'operation') {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await fn(attempt);
      } catch (error) {
        lastError = error;
        
        if (!this.isRetryableError(error) || attempt === maxRetries) {
          // Either non-retryable error or max retries reached
          break;
        }
        
        // Calculate exponential backoff delay with longer waits
        const baseDelay = 2000; // 2 seconds
        const delay = baseDelay * Math.pow(2, attempt - 1); // 2s, 4s, 8s, 16s, 32s...
        
        console.log(`[Claude Service] Retrying ${context} in ${delay}ms (attempt ${attempt}/${maxRetries})`);
        
        // Wait before retry
        await this.sleep(delay);
      }
    }
    
    // If we get here, all retries failed
    this.handleError(lastError, context);
  }

  /**
   * Check if an error is retryable
   * @param {Error} error - The error to check
   * @returns {boolean} - Whether the error is retryable
   */
  isRetryableError(error) {
    const errorMessage = error.message || '';
    const errorString = errorMessage.toLowerCase();
    
    // Check for overloaded errors
    if (errorString.includes('overloaded') || errorString.includes('overloaded_error')) {
      return true;
    }
    
    // Check for rate limit errors
    if (error.status === 429 || errorString.includes('rate limit')) {
      return true;
    }
    
    // Check for temporary server errors
    if (error.status >= 500 && error.status < 600) {
      return true;
    }
    
    // Check for connection errors
    if (errorString.includes('connection') || errorString.includes('timeout')) {
      return true;
    }
    
    return false;
  }

  /**
   * Sleep for a specified number of milliseconds
   * @param {number} ms - Milliseconds to sleep
   * @returns {Promise<void>}
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Handle errors with appropriate logging and re-throwing
   * @param {Error} error - The error to handle
   * @param {string} context - Context where the error occurred
   */
  handleError(error, context) {
    const errorInfo = {
      context,
      message: error.message,
      name: error.name,
      status: error.status,
      type: error.type
    };

    // Log different types of errors appropriately
    if (error.status === 401) {
      console.error(`[Claude Service] Authentication error in ${context}:`, errorInfo);
      throw new Error(`Authentication failed: Check your CLAUDE_API_KEY`);
    } else if (error.status === 429) {
      console.error(`[Claude Service] Rate limit error in ${context}:`, errorInfo);
      throw new Error(`Rate limit exceeded: Please try again later`);
    } else if (error.status === 400) {
      console.error(`[Claude Service] Bad request error in ${context}:`, errorInfo);
      throw new Error(`Invalid request: ${error.message}`);
    } else if (error.status >= 500) {
      console.error(`[Claude Service] Server error in ${context}:`, errorInfo);
      throw new Error(`Claude service unavailable: Please try again later`);
    } else {
      console.error(`[Claude Service] Unexpected error in ${context}:`, errorInfo);
      throw new Error(`Failed to complete ${context}: ${error.message}`);
    }
  }

  /**
   * System prompt for individual message generation
   */
  getIndividualMessageSystemPrompt() {
    return `Você é um especialista em copywriting para WhatsApp, focado em campanhas de lançamento. 

Suas mensagens devem ser:
- Diretas e envolventes
- Apropriadas para o momento específico da campanha
- Personalizadas conforme o negócio do cliente
- Persuasivas sem ser agressivas
- Formatadas para WhatsApp (emojis quando apropriado)

Gere APENAS o conteúdo da mensagem, sem títulos, sem formatação extra.`;
  }
}

module.exports = ClaudeService;