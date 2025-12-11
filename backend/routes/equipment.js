const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipmentController');
const { auth, requireAdmin } = require('../middleware/auth');

router.get('/', equipmentController.list);
router.post('/admin', auth, requireAdmin, equipmentController.create);
router.put('/admin/:id', auth, requireAdmin, equipmentController.update);

module.exports = router;
