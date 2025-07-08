const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messages.controller');

// Generate message
router.post('/generate', messagesController.generate);

// Generate messages with streaming
router.post('/generate-stream', messagesController.generateStream);

// Get message templates
router.get('/templates', messagesController.getTemplates);

// Get message history
router.get('/history', messagesController.getHistory);

// Get specific message set
router.get('/:id', messagesController.getById);

module.exports = router;