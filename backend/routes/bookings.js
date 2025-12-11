const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { auth } = require('../middleware/auth');

// must be logged-in to book / view own bookings
router.post('/', auth, bookingController.createBooking);
router.get('/me', auth, bookingController.getBookingsForCurrentUser);

module.exports = router;
