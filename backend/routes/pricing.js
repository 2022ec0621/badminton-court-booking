const express = require('express');
const router = express.Router();
const pricingController = require('../controllers/pricingController');
const { auth, requireAdmin } = require('../middleware/auth');

router.get('/', pricingController.list);
router.post('/admin', auth, requireAdmin, pricingController.create);
router.put('/admin/:id', auth, requireAdmin, pricingController.update);

module.exports = router;
