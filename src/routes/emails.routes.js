const express = require('express');
const router = express.Router();
const emailsController = require('../controllers/emails.controller');

// Rota principal para geração de emails com streaming
router.post('/generate-stream', emailsController.generateStreamEmails);

// Rota de debug para ver o payload formatado
router.post('/debug-format', emailsController.debugFormat);

module.exports = router;