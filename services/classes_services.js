const Class = require('../models/classes_model');
const ClassesForDay = require("../models/classesfortheday_model");
const Booking = require("../models/booking_model");


async function addClass(req, res) {
  const { departmentId, classNumber } = req.body;
  try {
    const newClass = new Class({ departmentId, classNumber});
    await newClass.save();
    res.status(201).json({ newClass });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllClasses(req, res) {
  try {
    const  { departmentId }  = req.query;
    const classes = await Class.find({departmentId}, 'departmentId classNumber classId');
    res.status(200).json({ classes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteClass(req, res) {
  const { classId } = req.params;
  try {
    const result = await Class.deleteOne({ _id:classId });
    if (result.deletedCount === 0) {
      throw new Error('Class not found');
    }
    res.status(200).json({ message: 'Class deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateClass(req, res) {
  const {classId } = req.params;
  const { newDepartmentId, newClassNumber} = req.body;
  try {
    const result = await Class.findByIdAndUpdate(classId , { departmentId: newDepartmentId, classNumber: newClassNumber});
    if (result.nModified === 0) {
      throw new Error('Class not found or no changes were made');
    }
    res.status(200).json({ message: 'Class updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAvailableClasses(req, res) {
  const { departmentId, timeslotId } = req.body;

  try {
    // Find all classes scheduled for the day
    const classesForTheDay = await ClassesForDay.find({ departmentId, timeId:timeslotId });
    // Find all bookings for the specified timeslot
    const bookings = await Booking.find({ timeslotId });
    console.log(bookings)
    // Extract labIds from classes and bookings
    const occupiedLabIds = [...classesForTheDay.map(cls => cls.classId), ...bookings.map(booking => booking.classId)];
    console.log(occupiedLabIds)
    // Find labs that are not in occupiedLabIds
    const availableClasses = await Class.find({ departmentId, _id: { $nin: occupiedLabIds } });
    console.log(availableClasses)
    res.status(200).json({ availableClasses });
  } catch (error) {
    console.error('Error fetching available labs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { addClass, getAllClasses, deleteClass, updateClass ,getAvailableClasses };
