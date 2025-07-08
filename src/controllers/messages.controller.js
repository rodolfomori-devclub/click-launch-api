const messagesService = require('../services/messages.service');

const messagesController = {
  async generate(req, res) {
    try {
      const { type, context } = req.body;
      
      if (!type || !context) {
        return res.status(400).json({ error: 'Type and context are required' });
      }

      // Using OpenAI assistant for message generation
      const result = await messagesService.generateMessage(type, context);
      
      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      console.error('Error generating message:', error);
      res.status(500).json({ error: 'Failed to generate message' });
    }
  },

  async getTemplates(req, res) {
    try {
      const templates = await messagesService.getTemplates();
      
      res.json({
        success: true,
        data: templates
      });
    } catch (error) {
      console.error('Error getting templates:', error);
      res.status(500).json({ error: 'Failed to get templates' });
    }
  },

  async getHistory(req, res) {
    try {
      const { type } = req.query;
      const history = await messagesService.getHistory(type);
      
      res.json({
        success: true,
        data: history
      });
    } catch (error) {
      console.error('Error getting history:', error);
      res.status(500).json({ error: 'Failed to get history' });
    }
  },

  async generateStream(req, res) {
    try {
      const { answers, questions, existingContent } = req.body;
      
      if (!answers || !questions) {
        return res.status(400).json({ error: 'Answers and questions are required' });
      }

      const answersCount = Object.keys(answers).length;
      if (answersCount === 0) {
        return res.status(400).json({ error: 'At least one answer is required' });
      }

      // Configure SSE headers
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Cache-Control',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
      });

      // Send initial metadata
      const metadata = {
        totalQuestions: questions.length,
        answeredQuestions: Object.keys(answers).length,
        completionRate: Math.round((Object.keys(answers).length / questions.length) * 100),
        generatedAt: new Date().toISOString()
      };

      res.write(`data: ${JSON.stringify({ type: 'metadata', data: metadata })}\n\n`);

      // Generate messages with streaming
      await messagesService.generateMessagesStream(answers, questions, existingContent, (chunk) => {
        res.write(`data: ${JSON.stringify({ type: 'content', data: chunk })}\n\n`);
      });

      // Send completion signal
      res.write(`data: ${JSON.stringify({ type: 'complete' })}\n\n`);
      res.end();

    } catch (error) {
      res.write(`data: ${JSON.stringify({ type: 'error', error: error.message })}\n\n`);
      res.end();
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const messageSet = await messagesService.getById(id);
      
      if (!messageSet) {
        return res.status(404).json({ error: 'Message set not found' });
      }
      
      res.json({
        success: true,
        data: messageSet
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get message set' });
    }
  }
};

module.exports = messagesController;