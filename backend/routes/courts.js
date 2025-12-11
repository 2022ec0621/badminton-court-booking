const express = require('express');
const router = express.Router();
const courtsController = require('../controllers/courtsController');
const { auth, requireAdmin } = require('../middleware/auth');

router.get('/', courtsController.list);
router.post('/admin', auth, requireAdmin, courtsController.create);
router.put('/admin/:id', auth, requireAdmin, courtsController.update);

module.exports = router;
