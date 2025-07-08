const editorialService = require('../services/editorial.service');

const editorialController = {
  async generate(req, res) {
    try {
      const { answers, questions } = req.body;
      
      if (!answers || !questions) {
        return res.status(400).json({ error: 'Answers and questions are required' });
      }

      const answersCount = Object.keys(answers).length;
      if (answersCount === 0) {
        return res.status(400).json({ error: 'At least one answer is required' });
      }

      const result = await editorialService.generateEditorial(answers, questions);
      
      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(500).json({ 
        error: 'Failed to generate editorial',
        details: error.message 
      });
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

      // Generate editorial with streaming
      await editorialService.generateEditorialStream(answers, questions, existingContent, (chunk) => {
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

  async getHistory(req, res) {
    try {
      // TODO: Implement database storage
      const history = await editorialService.getHistory();
      
      res.json({
        success: true,
        data: history
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get history' });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      
      // TODO: Implement database retrieval
      const editorial = await editorialService.getById(id);
      
      if (!editorial) {
        return res.status(404).json({ error: 'Editorial not found' });
      }
      
      res.json({
        success: true,
        data: editorial
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get editorial' });
    }
  }
};

module.exports = editorialController;