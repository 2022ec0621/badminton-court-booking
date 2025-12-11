const express = require('express');
const router = express.Router();
const coachesController = require('../controllers/coachesController');
const { auth, requireAdmin } = require('../middleware/auth');

router.get('/', coachesController.list);
router.post('/admin', auth, requireAdmin, coachesController.create);
router.put('/admin/:id', auth, requireAdmin, coachesController.update);

module.exports = router;
