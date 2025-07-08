const express = require('express');
const router = express.Router();

// Get AI provider status
router.get('/status', (req, res) => {
  try {
    const aiService = require('../services/ai.service');
    
    res.json({
      success: true,
      data: {
        provider: 'openai',
        timestamp: new Date().toISOString(),
        configuration: {
          openai: {
            available: !!(process.env.OPENAI_API_KEY && process.env.OPENAI_ASSISTANT_ID),
            assistantId: process.env.OPENAI_ASSISTANT_ID
          }
        }
      }
    });
  } catch (error) {
    console.error('Error getting AI status:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

module.exports = router;