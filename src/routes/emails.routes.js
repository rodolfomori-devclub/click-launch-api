const express = require('express');
const router = express.Router();
const emailsController = require('../controllers/emails.controller');

// Rota principal para geração de emails com streaming
router.post('/generate-stream', emailsController.generateStreamEmails);

// Rota de debug para ver o payload formatado
router.post('/debug-format', emailsController.debugFormat);

// Rotas para preview e export
router.post('/preview', emailsController.preview);
router.post('/export', emailsController.export);

// Rotas para gerenciamento de provedores AI
router.get('/provider-info', emailsController.providerInfo);
router.post('/test-provider', emailsController.testProvider);

module.exports = router;