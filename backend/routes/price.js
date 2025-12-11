const express = require('express');
const router = express.Router();
const priceController = require('../controllers/priceController');

// POST /api/price/preview
router.post('/preview', priceController.previewPrice);

module.exports = router;
