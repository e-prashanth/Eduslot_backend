const Booking = require('../models/booking_model');

async function addBooking(req, res) {
  const { userId, deptId, yearId, dayId, labId, classId, time, date } = req.body;
  try {
    const newBooking = new Booking({ userId, deptId, yearId, dayId, labId, classId, time, date });
    await newBooking.save();
    res.status(201).json({ newBooking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllBookings(req, res) {
  try {
    const bookings = await Booking.find({}, 'userId deptId yearId dayId labId classId time date');
    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteBooking(req, res) {
  const { bookingId } = req.params;
  try {
    const result = await Booking.deleteOne({ _id: bookingId });
    if (result.deletedCount === 0) {
      throw new Error('Booking not found');
    }
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateBooking(req, res) {
  const { bookingId } = req.params;
  const { newUserId, newDeptId, newYearId, newDayId, newLabId, newClassId, newTime, newDate } = req.body;
  try {
    const result = await Booking.updateOne(
      { _id: bookingId },
      { userId: newUserId, deptId: newDeptId, yearId: newYearId, dayId: newDayId, labId: newLabId, classId: newClassId, time: newTime, date: newDate }
    );
    if (result.nModified === 0) {
      throw new Error('Booking not found or no changes were made');
    }
    res.status(200).json({ message: 'Booking updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { addBooking, getAllBookings, deleteBooking, updateBooking };
