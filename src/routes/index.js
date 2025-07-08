const express = require('express');
const router = express.Router();

// Import route modules
const editorialRoutes = require('./editorial.routes');
const messagesRoutes = require('./messages.routes');
const emailsRoutes = require('./emails.routes');
const aiRoutes = require('./ai.routes');

// Use route modules
router.use('/editorial', editorialRoutes);
router.use('/messages', messagesRoutes);
router.use('/emails', emailsRoutes);
router.use('/ai', aiRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'ClickLaunch API'
  });
});

module.exports = router;