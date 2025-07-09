const messagesService = require('../services/messages.service');

const messagesController = {
  async generate(req, res) {
    try {
      const { type, context } = req.body;
      
      if (!type || !context) {
        return res.status(400).json({ error: 'Type and context are required' });
      }

      // Using Claude service for message generation
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

  async generateStream(req, res) {
    try {
      const { answers, questions, existingContent, level, phase, messageNumbers } = req.body;
      
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
        provider: 'claude',
        generationType: messageNumbers ? 'specific-messages' : (phase ? 'single-phase' : 'all-phases'),
        totalQuestions: questions.length,
        answeredQuestions: Object.keys(answers).length,
        completionRate: Math.round((Object.keys(answers).length / questions.length) * 100),
        generatedAt: new Date().toISOString(),
        level: level || 'complete',
        phase: phase || null,
        messageNumbers: messageNumbers || null
      };

      res.write(`data: ${JSON.stringify({ type: 'metadata', data: metadata })}\n\n`);

      // Generate messages with Claude streaming
      if (messageNumbers && Array.isArray(messageNumbers)) {
        // Generate specific messages by numbers
        await messagesService.generateSpecificMessages(
          messageNumbers,
          answers, 
          questions, 
          (chunk) => {
            res.write(`data: ${JSON.stringify({ type: 'content', data: chunk })}\n\n`);
          }
        );
      } else if (phase) {
        // Generate specific phase
        await messagesService.generatePhaseWithClaude(
          phase, 
          answers, 
          questions, 
          existingContent,
          (chunk) => {
            res.write(`data: ${JSON.stringify({ type: 'content', data: chunk })}\n\n`);
          }
        );
      } else {
        // Generate all phases sequentially
        await messagesService.generateAllPhasesWithClaude(
          answers, 
          questions, 
          existingContent,
          (chunk) => {
            res.write(`data: ${JSON.stringify({ type: 'content', data: chunk })}\n\n`);
          }
        );
      }

      // Send completion signal
      res.write(`data: ${JSON.stringify({ type: 'complete' })}\n\n`);
      res.end();

    } catch (error) {
      console.error('Error in generateStream:', error);
      res.write(`data: ${JSON.stringify({ type: 'error', error: error.message })}\n\n`);
      res.end();
    }
  },

  async debug(req, res) {
    try {
      const { answers, questions } = req.body;
      
      if (!answers || !questions) {
        return res.status(400).json({ error: 'Answers and questions are required' });
      }

      const result = messagesService.debugFormat(answers, questions);
      res.json(result);
    } catch (error) {
      console.error('Error in debug:', error);
      res.status(500).json({ error: 'Failed to debug format' });
    }
  },

  async getTemplates(req, res) {
    try {
      const { getMessageNumbersByPhase, getMessageTemplate } = require('../data/message-templates');
      const { getPhaseOrder } = require('../data/messages-phases');
      
      const phases = getPhaseOrder();
      const templatesInfo = {};
      
      phases.forEach(phase => {
        try {
          const messageNumbers = getMessageNumbersByPhase(phase);
          templatesInfo[phase] = {
            messageCount: messageNumbers.length,
            messages: messageNumbers.map(num => {
              const template = getMessageTemplate(num);
              return {
                number: num,
                name: template.name,
                timing: template.timing
              };
            })
          };
        } catch (error) {
          console.error(`Error processing phase ${phase}:`, error);
          templatesInfo[phase] = { messageCount: 0, messages: [] };
        }
      });

      res.json({
        success: true,
        data: {
          phases: templatesInfo,
          totalPhases: phases.length,
          totalMessages: Object.values(templatesInfo).reduce((sum, phase) => sum + phase.messageCount, 0)
        }
      });
    } catch (error) {
      console.error('Error getting templates:', error);
      res.status(500).json({ error: 'Failed to get templates info' });
    }
  }
};

module.exports = messagesController;