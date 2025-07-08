const OpenAI = require('openai');
const { createEmailGenerationPrompt } = require('../prompts-reference/enhanced-email-prompt');

class OpenAIService {
  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateStreamWithAssistant(payload, onChunk, assistantId) {
    try {
      if (!assistantId) {
        throw new Error('Assistant ID is required');
      }
      
      console.log('🚀 Starting OpenAI Assistant generation with streaming');
      console.log('🤖 Using Assistant ID:', assistantId);
      console.log('📊 Payload type:', typeof payload);
      console.log('📏 Payload size:', JSON.stringify(payload).length, 'characters');
      
      // =========================
      // STEP 1: CREATE THREAD
      // =========================
      console.log('\n📋 === STEP 1: CREATE THREAD ===');
      console.log('🔗 API Endpoint: POST https://api.openai.com/v1/threads');
      console.log('📦 Request Payload: {}');
      
      const thread = await this.client.beta.threads.create();
      console.log('✅ Thread created:', thread.id);
      
      // =========================
      // STEP 2: ADD MESSAGE TO THREAD
      // =========================
      console.log('\n💬 === STEP 2: ADD MESSAGE TO THREAD ===');
      console.log(`🔗 API Endpoint: POST https://api.openai.com/v1/threads/${thread.id}/messages`);
      
      // Converter payload para string JSON para enviar como content
      const contentToSend = JSON.stringify(payload, null, 2);
      
      const messagePayload = {
        role: 'user',
        content: contentToSend
      };
      
      console.log('📦 === PAYLOAD COMPLETO ENVIADO PARA OPENAI ===');
      console.log(JSON.stringify(messagePayload, null, 2));
      console.log('📋 === CONTEÚDO DETALHADO ===');
      console.log(contentToSend);
      console.log('='.repeat(50));
      
      await this.client.beta.threads.messages.create(thread.id, messagePayload);
      console.log('✅ Message added to thread');
      
      // =========================
      // STEP 3: CREATE RUN WITH STREAMING
      // =========================
      console.log('\n🏃 === STEP 3: CREATE RUN WITH STREAMING ===');
      console.log(`🔗 API Endpoint: POST https://api.openai.com/v1/threads/${thread.id}/runs`);
      
      const runPayload = {
        assistant_id: assistantId,
        stream: true
      };
      
      console.log('📦 Run Payload:');
      console.log(JSON.stringify(runPayload, null, 2));
      
      const stream = await this.client.beta.threads.runs.stream(thread.id, runPayload);
      console.log('🌊 Stream initiated...');

      let fullContent = '';
      let eventCount = 0;
      
      // Process the stream
      console.log('\n📥 === STREAMING EVENTS ===');
      for await (const event of stream) {
        eventCount++;
        
        if (eventCount <= 3) {
          console.log(`📨 Event ${eventCount}:`, {
            event: event.event,
            data_type: event.data?.object || 'unknown'
          });
        }
        
        if (event.event === 'thread.message.delta') {
          const delta = event.data.delta;
          if (delta.content && delta.content[0] && delta.content[0].text) {
            const content = delta.content[0].text.value || '';
            if (content) {
              fullContent += content;
              onChunk(content);
            }
          }
        }
      }
      
      console.log(`\n✅ Assistant stream completed!`);
      console.log(`📊 Total events processed: ${eventCount}`);
      console.log(`📏 Total content length: ${fullContent.length}`);
      
      // Clean up thread
      try {
        console.log(`\n🧹 Cleaning up thread: ${thread.id}`);
        await this.client.beta.threads.del(thread.id);
        console.log('✅ Thread cleaned up successfully');
      } catch (cleanupError) {
        console.warn('⚠️ Failed to cleanup thread:', cleanupError.message);
      }
      
      return fullContent;
      
    } catch (error) {
      console.error('💥 OpenAI Assistant service error:', error);
      console.error('🔍 Error details:', {
        message: error.message,
        status: error.status,
        code: error.code,
        type: error.type
      });
      throw error;
    }
  }

  async generateStreamWithAssistantEnhanced(answers, questions, onChunk, assistantId, batchInfo = null) {
    try {
      if (!assistantId) {
        throw new Error('Assistant ID is required');
      }
      
      if (batchInfo) {
        console.log('🚀 Starting OpenAI Assistant generation with BATCH SYSTEM');
        console.log(`📊 Lote: ${batchInfo.batchNumber}/6 (${batchInfo.batchNumber === 6 ? '4' : '5'} emails)`);
      } else {
        console.log('🚀 Starting OpenAI Assistant generation with ENHANCED PROMPT');
      }
      console.log('🤖 Using Assistant ID:', assistantId);
      console.log(`📊 Perguntas: ${questions.length}, Respostas: ${Object.keys(answers).length}`);
      
      // Criar prompt estruturado usando os frameworks anexados (com suporte a lotes)
      const enhancedPrompt = createEmailGenerationPrompt(answers, questions, batchInfo);
      
      console.log('📏 Enhanced Prompt size:', enhancedPrompt.length, 'characters');
      
      // =========================
      // STEP 1: CREATE THREAD
      // =========================
      console.log('\n📋 === STEP 1: CREATE THREAD ===');
      const thread = await this.client.beta.threads.create();
      console.log('✅ Thread created:', thread.id);
      
      // =========================
      // STEP 2: ADD MESSAGE TO THREAD
      // =========================
      console.log('\n💬 === STEP 2: ADD MESSAGE TO THREAD ===');
      
      const messagePayload = {
        role: 'user',
        content: enhancedPrompt
      };
      
      console.log('📦 === PROMPT ESTRUTURADO ENVIADO ===');
      console.log('Primeiros 500 caracteres:');
      console.log(enhancedPrompt.substring(0, 500) + '...');
      console.log('='.repeat(50));
      
      await this.client.beta.threads.messages.create(thread.id, messagePayload);
      console.log('✅ Enhanced message added to thread');
      
      // =========================
      // STEP 3: CREATE RUN WITH STREAMING
      // =========================
      console.log('\n🏃 === STEP 3: CREATE RUN WITH STREAMING ===');
      
      const runPayload = {
        assistant_id: assistantId,
        stream: true
      };
      
      const stream = await this.client.beta.threads.runs.stream(thread.id, runPayload);
      console.log('🌊 Enhanced stream initiated...');

      let fullContent = '';
      let eventCount = 0;
      
      // Process the stream
      console.log('\n📥 === STREAMING EVENTS ===');
      for await (const event of stream) {
        eventCount++;
        
        if (eventCount <= 3) {
          console.log(`📨 Event ${eventCount}:`, {
            event: event.event,
            data_type: event.data?.object || 'unknown'
          });
        }
        
        if (event.event === 'thread.message.delta') {
          const delta = event.data.delta;
          if (delta.content && delta.content[0] && delta.content[0].text) {
            const content = delta.content[0].text.value || '';
            if (content) {
              fullContent += content;
              onChunk(content);
            }
          }
        }
      }
      
      console.log(`\n✅ Enhanced Assistant stream completed!`);
      console.log(`📊 Total events processed: ${eventCount}`);
      console.log(`📏 Total content length: ${fullContent.length}`);
      
      // Clean up thread
      try {
        console.log(`\n🧹 Cleaning up thread: ${thread.id}`);
        await this.client.beta.threads.del(thread.id);
        console.log('✅ Thread cleaned up successfully');
      } catch (cleanupError) {
        console.warn('⚠️ Failed to cleanup thread:', cleanupError.message);
      }
      
      return fullContent;
      
    } catch (error) {
      console.error('💥 OpenAI Enhanced Assistant service error:', error);
      console.error('🔍 Error details:', {
        message: error.message,
        status: error.status,
        code: error.code,
        type: error.type
      });
      throw error;
    }
  }

  // Aliases for backward compatibility
  async generateEmailsStream(formattedAnswers, onChunk) {
    throw new Error('Use generateStreamWithAssistant with specific assistant ID instead');
  }

  async generateEditorialAnalysisStream(formattedAnswers, onChunk) {
    throw new Error('Use generateStreamWithAssistant with specific assistant ID instead');
  }

  async generateMessagesStream(formattedAnswers, onChunk) {
    throw new Error('Use generateStreamWithAssistant with specific assistant ID instead');
  }
}

module.exports = new OpenAIService();