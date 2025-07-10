const emailsService = require('../services/emails.service');
const AIProviderFactory = require('../services/ai-provider.factory');

const emailsController = {
  async generateStreamEmails(req, res) {
    try {
      const { answers, questions, batchInfo, phase, isSequential } = req.body;

      if (!answers || !questions) {
        return res.status(400).json({
          success: false,
          error: 'Answers e questions são obrigatórios'
        });
      }

      // Log generation type
      if (phase) {
        console.log(`📧 Iniciando geração de emails por fase - Fase: ${phase}...`);
      } else if (batchInfo) {
        console.log(`📧 Iniciando geração de emails - Lote ${batchInfo.batchNumber}/6...`);
      } else {
        console.log('📧 Iniciando geração de emails via OpenAI Assistant...');
      }

      // Configurar headers para SSE
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Cache-Control'
      });

      // Função para enviar chunks via SSE
      function sendChunk(data, type = 'content') {
        const sseData = JSON.stringify({ type, data });
        res.write(`data: ${sseData}\n\n`);
      }

      try {
        // Enviar metadata inicial
        const providerInfo = AIProviderFactory.getProviderInfo();
        const currentProvider = AIProviderFactory.getCurrentEmailsProvider();
        
        const metadata = {
          totalQuestions: questions.length,
          answeredQuestions: Object.keys(answers).length,
          provider: currentProvider,
          model: providerInfo.configurations[currentProvider]?.model || 'Unknown',
          generationType: isSequential ? 'sequential' : (phase ? 'phase' : 'full'),
          phase: phase || null,
          isSequential: isSequential || false,
          availableProviders: providerInfo.available
        };
        
        sendChunk(metadata, 'metadata');

        // Gerar emails usando o provider configurado com sistema de fases
        const fullContent = await emailsService.generateEmailsStream(
          answers, 
          questions, 
          (chunk) => sendChunk(chunk, 'content'),
          batchInfo,
          phase
        );

        // Enviar sinal de conclusão
        sendChunk({ 
          status: 'completed', 
          totalLength: fullContent.length,
          phase: phase || null,
          generationType: phase ? 'phase' : (batchInfo ? 'batch' : 'full')
        }, 'complete');

      } catch (error) {
        console.error('Erro na geração de emails:', error);
        sendChunk(error.message, 'error');
      }

      res.end();

    } catch (error) {
      console.error('Erro no controller de emails:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },

  async debugFormat(req, res) {
    try {
      const { answers, questions } = req.body;

      if (!answers || !questions) {
        return res.status(400).json({
          success: false,
          error: 'Answers e questions são obrigatórios'
        });
      }

      const result = emailsService.debugFormat(answers, questions);
      res.json(result);

    } catch (error) {
      console.error('Erro no debug format:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },

  async preview(req, res) {
    try {
      const { html, data } = req.body;
      
      if (!html) {
        return res.status(400).json({ error: 'HTML content is required' });
      }

      const preview = await emailsService.generatePreview(html, data);
      
      res.json({
        success: true,
        data: preview
      });
    } catch (error) {
      console.error('Error generating preview:', error);
      res.status(500).json({ error: 'Failed to generate preview' });
    }
  },

  async export(req, res) {
    try {
      const { emailId, format } = req.body;
      
      if (!emailId || !format) {
        return res.status(400).json({ error: 'Email ID and format are required' });
      }

      const exported = await emailsService.exportEmail(emailId, format);
      
      res.json({
        success: true,
        data: exported
      });
    } catch (error) {
      console.error('Error exporting email:', error);
      res.status(500).json({ error: 'Failed to export email' });
    }
  },

  async providerInfo(req, res) {
    try {
      const providerInfo = AIProviderFactory.getProviderInfo();
      
      res.json({
        success: true,
        data: providerInfo
      });
    } catch (error) {
      console.error('Error getting provider info:', error);
      res.status(500).json({ error: 'Failed to get provider information' });
    }
  },

  async testProvider(req, res) {
    try {
      const { provider } = req.body;
      
      if (!provider) {
        return res.status(400).json({ error: 'Provider is required' });
      }

      const isAvailable = await AIProviderFactory.testProvider(provider);
      
      res.json({
        success: true,
        provider,
        available: isAvailable,
        message: isAvailable ? 'Provider is working correctly' : 'Provider test failed'
      });
    } catch (error) {
      console.error('Error testing provider:', error);
      res.status(500).json({ 
        success: false,
        error: error.message 
      });
    }
  }
};

module.exports = emailsController;