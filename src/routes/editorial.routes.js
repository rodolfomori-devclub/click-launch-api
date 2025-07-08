const express = require('express');
const router = express.Router();
const editorialController = require('../controllers/editorial.controller');

// Generate editorial line
router.post('/generate', editorialController.generate);

// Generate editorial line with streaming
router.post('/generate-stream', editorialController.generateStream);

// Get editorial history
router.get('/history', editorialController.getHistory);

// Get specific editorial
router.get('/:id', editorialController.getById);

module.exports = router;