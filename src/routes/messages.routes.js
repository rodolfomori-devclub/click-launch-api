const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messages.controller');

// Generate messages (legacy)
router.post('/generate', messagesController.generate);

// Generate messages with streaming (main endpoint)
router.post('/generate-stream', messagesController.generateStream);

// Debug endpoint - format questions/answers without calling API
router.post('/debug', messagesController.debug);

// Get templates information
router.get('/templates', messagesController.getTemplates);

module.exports = router;