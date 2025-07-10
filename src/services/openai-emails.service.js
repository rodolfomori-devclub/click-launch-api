const OpenAI = require('openai');
const { getTemplatesByPhase: getEmailTemplatesByPhase, getGuidelinesForPhase } = require('../data/email-templates');

/**
 * OpenAI Service for Email Generation
 * Handles phase-based email generation using OpenAI API (compatible with Claude interface)
 */
class OpenAIEmailsService {
  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.model = process.env.OPENAI_MODEL || 'gpt-4-turbo-preview';
    this.maxTokens = parseInt(process.env.OPENAI_MAX_TOKENS) || 4000;
  }

  /**
   * Generate emails for a specific phase with streaming support and retry mechanism
   * @param {string} phase - The phase to generate emails for
   * @param {object} questionsAndAnswers - User's answers to the questionnaire
   * @param {object} previousPhasesContext - Context from previous phases
   * @param {function} onChunk - Callback for each chunk of data
   * @param {number} maxRetries - Maximum number of retry attempts
   * @returns {Promise<string>} - Complete generated content
   */
  async generateEmailsForPhaseStream(phase, questionsAndAnswers, previousPhasesContext = {}, onChunk, maxRetries = 5) {
    return this.executeWithRetry(async (attempt) => {
      const startTime = Date.now();
      let streamStarted = false;
      
      try {
        this.validateInputs(phase, questionsAndAnswers);
        
        const templates = getEmailTemplatesByPhase(phase);
        const prompt = this.buildEmailPhasePrompt(phase, templates, questionsAndAnswers, previousPhasesContext);

        console.log(`[OpenAI Email Service] Starting email streaming generation for phase: ${phase} (attempt ${attempt}/${maxRetries})`);
        console.log(`[OpenAI Email Service] Emails in phase: ${templates.map(t => t.number).join(', ')}`);
        console.log(`[OpenAI Email Service] Prompt length: ${prompt.length} characters`);

        const stream = await this.client.chat.completions.create({
          model: this.model,
          max_tokens: this.maxTokens,
          temperature: 0.7,
          messages: [
            {
              role: 'system',
              content: this.getEmailSystemPrompt()
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          stream: true
        });

        streamStarted = true;
        let completeContent = '';
        let chunkCount = 0;

        for await (const chunk of stream) {
          const content = chunk.choices?.[0]?.delta?.content;
          if (content) {
            completeContent += content;
            chunkCount++;
            
            if (onChunk) {
              try {
                onChunk(content);
              } catch (chunkError) {
                console.warn(`[OpenAI Email Service] Error in chunk callback:`, chunkError.message);
              }
            }
          }
        }

        const duration = Date.now() - startTime;
        console.log(`[OpenAI Email Service] Email streaming completed. Total length: ${completeContent.length} characters`);
        console.log(`[OpenAI Email Service] Processed ${chunkCount} chunks in ${duration}ms`);
        
        return completeContent;
      } catch (error) {
        const duration = Date.now() - startTime;
        console.error(`[OpenAI Email Service] Error in email streaming generation for phase ${phase} after ${duration}ms (attempt ${attempt}/${maxRetries}):`, {
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
          this.handleError(error, `email streaming generation for phase ${phase}`);
        }
      }
    }, maxRetries, phase);
  }

  /**
   * Build phase prompt for multiple emails generation
   */
  buildEmailPhasePrompt(phase, templates, questionsAndAnswers, previousPhasesContext) {
    const { getAllPhases } = require('../data/launch-phases');
    const phaseInfo = getAllPhases().find(p => p.key === phase);
    
    const prompt = `
GERAÇÃO DE EMAILS PARA LANÇAMENTO - ${phaseInfo.name.toUpperCase()}

CONTEXTO DA FASE:
${phaseInfo.description}
Objetivo: ${phaseInfo.context}

INSTRUÇÕES GERAIS:
Você deve gerar ${templates.length} emails para esta fase do lançamento, cada um seguindo as instruções específicas de seu template.

QUESTIONÁRIO RESPONDIDO:
${this.formatQuestionsAndAnswers(questionsAndAnswers)}

${Object.keys(previousPhasesContext).length > 0 ? 
  `CONTEXTO DAS FASES ANTERIORES:\n${this.formatPreviousPhasesContext(previousPhasesContext)}\n` : 
  ''
}

EMAILS PARA GERAR:

${templates.map((template, index) => `
EMAIL ${template.number}: ${template.template.name.toUpperCase()}
Assunto: ${template.template.subject}
Timing: ${template.timing}
Objetivo: ${template.objective}

TEMPLATE ESPECÍFICO:
${template.template.framework}

DIRETRIZES:
${template.template.guidelines}

${index < templates.length - 1 ? '---' : ''}
`).join('\n')}

FORMATO DE RESPOSTA:
Para cada email, use este formato exato:

**EMAIL [NÚMERO]: [NOME DO EMAIL]**

**ASSUNTO:** [Assunto do email]

[Conteúdo completo do email aqui]

---

Substitua todos os placeholders [EXEMPLO] pelas informações reais do questionário.
Mantenha consistência entre os emails e adapte o tom conforme a fase da campanha.
`;

    return prompt;
  }

  /**
   * Get system prompt for email generation with OpenAI
   * @returns {string} - System prompt for emails
   */
  getEmailSystemPrompt() {
    return `Você é um especialista em marketing digital e copywriting, especializado em sequências de e-mail para lançamentos de produtos digitais. Sua tarefa é gerar emails de alta qualidade para campanhas de lançamento, seguindo templates específicos e personalizando com base nas informações fornecidas.

Características importantes:
- Você domina técnicas de persuasão e copywriting para emails
- Entende profundamente a psicologia do consumidor em campanhas de email
- Sabe criar senso de urgência e escassez através de emails
- Personaliza cada email com base no nicho e público-alvo
- Mantém consistência narrativa ao longo da sequência de emails
- Usa linguagem natural e envolvente em formato de email
- Aplica gatilhos mentais apropriados para cada fase do lançamento
- Cria linhas de assunto atrativas e persuasivas

IMPORTANTE:
- Substitua TODOS os placeholders [EXEMPLO] pelos dados reais do questionário
- Mantenha o formato de email profissional mas pessoal
- Adapte o tom conforme a fase: educativo no evento, urgente nas vendas
- Use quebras de linha adequadas para facilitar a leitura
- Inclua calls-to-action claros e persuasivos

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
      console.error(`[OpenAI Email Service] Error generating context for phase ${phase}:`, error);
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
   * Test OpenAI connection
   * @returns {Promise<boolean>} - Whether OpenAI is accessible
   */
  async testConnection() {
    try {
      console.log('[OpenAI Email Service] Testing connection...');
      
      const response = await this.client.chat.completions.create({
        model: this.model,
        max_tokens: 50,
        messages: [
          {
            role: 'user',
            content: 'Teste de conexão. Responda apenas "OK".'
          }
        ]
      });

      const success = response.choices?.[0]?.message?.content?.includes('OK');
      console.log(`[OpenAI Email Service] Connection test ${success ? 'passed' : 'failed'}`);
      
      return success;
    } catch (error) {
      console.error('[OpenAI Email Service] Connection test failed:', {
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

    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured in environment variables');
    }

    console.log(`[OpenAI Email Service] Input validation passed for phase: ${phase}`);
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
        
        console.log(`[OpenAI Email Service] Retrying ${context} in ${delay}ms (attempt ${attempt}/${maxRetries})`);
        
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
    
    // Check for OpenAI specific retryable errors
    if (errorString.includes('server_error') || errorString.includes('service_unavailable')) {
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
      console.error(`[OpenAI Email Service] Authentication error in ${context}:`, errorInfo);
      throw new Error(`Authentication failed: Check your OPENAI_API_KEY`);
    } else if (error.status === 429) {
      console.error(`[OpenAI Email Service] Rate limit error in ${context}:`, errorInfo);
      throw new Error(`Rate limit exceeded: Please try again later`);
    } else if (error.status === 400) {
      console.error(`[OpenAI Email Service] Bad request error in ${context}:`, errorInfo);
      throw new Error(`Invalid request: ${error.message}`);
    } else if (error.status >= 500) {
      console.error(`[OpenAI Email Service] Server error in ${context}:`, errorInfo);
      throw new Error(`OpenAI service unavailable: Please try again later`);
    } else {
      console.error(`[OpenAI Email Service] Unexpected error in ${context}:`, errorInfo);
      throw new Error(`Failed to complete ${context}: ${error.message}`);
    }
  }
}

module.exports = OpenAIEmailsService;