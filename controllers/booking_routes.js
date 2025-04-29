const express = require('express');
const router = express.Router();
const bookingService = require('../services/booking_services');

router.post('/add-booking', bookingService.addBooking);
router.get('/get-all-bookings', bookingService.getAllBookings);
router.get('/get-all-past-bookings',bookingService.getPastBookings);
router.delete('/delete-booking/:bookingId', bookingService.deleteBooking);
router.put('/update-booking/:bookingId', bookingService.updateBooking);

module.exports = router;
