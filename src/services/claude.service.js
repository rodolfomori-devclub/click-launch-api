const Anthropic = require('@anthropic-ai/sdk');
const { getTemplatesByPhase, getGuidelinesForPhase } = require('../data/email-templates');
const { getPreviousPhases, getEmailsByPhase } = require('../data/launch-phases');

/**
 * Claude Service for Email Generation
 * Handles phase-based email generation using Anthropic Claude API
 */
class ClaudeService {
  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.CLAUDE_API_KEY,
    });
    this.model = process.env.CLAUDE_MODEL || 'claude-3-5-sonnet-20241022';
  }

  /**
   * Generate emails for a specific phase
   * @param {string} phase - The phase to generate emails for
   * @param {object} questionsAndAnswers - User's answers to the questionnaire
   * @param {object} previousPhasesContext - Context from previous phases
   * @returns {Promise<string>} - Generated emails content
   */
  async generateEmailsForPhase(phase, questionsAndAnswers, previousPhasesContext = {}) {
    const startTime = Date.now();
    
    try {
      this.validateInputs(phase, questionsAndAnswers);
      
      const templates = getTemplatesByPhase(phase);
      const guidelines = getGuidelinesForPhase(phase);
      const prompt = this.buildPhasePrompt(phase, templates, guidelines, questionsAndAnswers, previousPhasesContext);

      console.log(`[Claude Service] Starting generation for phase: ${phase}`);
      console.log(`[Claude Service] Emails in phase: ${templates.map(t => t.number).join(', ')}`);
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
      console.error(`[Claude Service] Error generating emails for phase ${phase} after ${duration}ms:`, {
        error: error.message,
        phase,
        stack: error.stack
      });
      
      this.handleError(error, `generation for phase ${phase}`);
    }
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
        
        const templates = getTemplatesByPhase(phase);
        const guidelines = getGuidelinesForPhase(phase);
        const prompt = this.buildPhasePrompt(phase, templates, guidelines, questionsAndAnswers, previousPhasesContext);

        console.log(`[Claude Service] Starting streaming generation for phase: ${phase} (attempt ${attempt}/${maxRetries})`);
        console.log(`[Claude Service] Emails in phase: ${templates.map(t => t.number).join(', ')}`);
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
   * Build the prompt for a specific phase
   * @param {string} phase - The phase to generate emails for
   * @param {Array} templates - Email templates for this phase
   * @param {object} guidelines - Guidelines for this phase
   * @param {object} questionsAndAnswers - User's answers
   * @param {object} previousPhasesContext - Context from previous phases
   * @returns {string} - Complete prompt for Claude
   */
  buildPhasePrompt(phase, templates, guidelines, questionsAndAnswers, previousPhasesContext) {
    const emails = getEmailsByPhase(phase);
    const emailNumbers = emails.map(e => e.number);
    
    let prompt = `# GERAÇÃO DE EMAILS POR FASE - FASE: ${phase.toUpperCase()}

## INFORMAÇÕES DA FASE
- **Nome da Fase**: ${guidelines.general}
- **Tom**: ${guidelines.tone}
- **Objetivos**: ${guidelines.objectives.join(', ')}
- **Emails a Gerar**: ${emailNumbers.join(', ')} (${emailNumbers.length} emails)

## CONTEXTO DO LANÇAMENTO
${this.formatQuestionsAndAnswers(questionsAndAnswers)}

`;

    // Add previous phases context if available
    if (Object.keys(previousPhasesContext).length > 0) {
      prompt += `## CONTEXTO DAS FASES ANTERIORES
${this.formatPreviousPhasesContext(previousPhasesContext)}

`;
    }

    // Add templates and guidelines for each email
    prompt += `## TEMPLATES E ORIENTAÇÕES DOS EMAILS

`;

    templates.forEach(({ number, name, template }) => {
      prompt += `### EMAIL ${number}: ${name}
**Template:**
${template.framework}

**Orientações Específicas:**
${template.guidelines}

---

`;
    });

    prompt += `## INSTRUÇÕES PARA GERAÇÃO

1. **Gere exatamente ${emailNumbers.length} emails** correspondentes aos números: ${emailNumbers.join(', ')}

2. **Mantenha coerência narrativa** entre os emails desta fase e com as fases anteriores (se houver)

3. **Use as informações do questionário** para personalizar cada email, substituindo todos os placeholders como [NOME], [PRODUTO], [BENEFÍCIO PRINCIPAL], etc.

4. **Siga exatamente a estrutura e tom** dos templates fornecidos

5. **Respeite as orientações específicas** de cada email

6. **Formato de saída**: Para cada email, use este formato:
   \`\`\`
   EMAIL [NÚMERO] - [NOME DO EMAIL]
   ASSUNTO: [Assunto personalizado]
   
   [Conteúdo do email personalizado]
   
   ---
   \`\`\`

7. **Personalização obrigatória**: Substitua TODOS os placeholders pelos dados reais do questionário

8. **Coerência**: Mantenha consistência de linguagem, tom e informações entre todos os emails

9. **Qualidade**: Cada email deve ser completo, persuasivo e pronto para envio

Comece a geração agora:

IMPORTANTE: 
- Gere EXATAMENTE ${emailNumbers.length} emails (números: ${emailNumbers.join(', ')})
- Use o separador "---" entre cada email
- Mantenha a numeração sequencial correta
- Não deixe emails em branco ou incompletos
- Cada email deve ser completo e separado claramente
- Use sempre o formato: EMAIL [NÚMERO] - [NOME]
- Garanta que cada email tenha assunto e conteúdo completos`;

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
}

module.exports = ClaudeService;