const Lab = require("../models/labs_model");
const ClassesForDay = require("../models/classesfortheday_model");
const Booking = require("../models/booking_model");


async function addLab(req, res) {
  const { departmentId, labName } = req.body;
  try {
    const newLab = new Lab({ departmentId, labName });
    await newLab.save();
    res.status(201).json({ newLab });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllLabs(req, res) {
  try {
    const  { departmentId }  = req.query;
    const labs = await Lab.find({departmentId}, "departmentId labName labId");
    res.status(200).json({ labs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteLab(req, res) {
  const { labId } = req.params;
  try {
    const result = await Lab.deleteOne({ _id: labId });
    if (result.deletedCount === 0) {
      throw new Error("Lab not found");
    }
    res.status(200).json({ message: "Lab deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateLab(req, res) {
  const { labId } = req.params;
  const { newDepartmentId, newLabName } = req.body;
  try {
    const result = await Lab.findByIdAndUpdate(labId, {
      departmentId: newDepartmentId,
      labName: newLabName,
    });
    if (result.nModified === 0) {
      throw new Error("Lab not found or no changes were made");
    }
    res.status(200).json({ message: "Lab updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAvailableLabs(req, res) {
  const { departmentId, timeslotId } = req.body;

  try {
    // Find all classes scheduled for the day
    const classesForTheDay = await ClassesForDay.find({ departmentId, timeId:timeslotId });
    console.log(classesForTheDay)
    // Find all bookings for the specified timeslot
    const bookings = await Booking.find({ timeId:timeslotId });
    console.log("bookings Data:",bookings);
    // Extract labIds from classes and bookings
    const occupiedLabIds = [...classesForTheDay.map(cls => cls.labId), ...bookings.map(booking => booking.labId)];
    console.log(occupiedLabIds);
    const availableLabs = await Lab.find({ departmentId, _id: { $nin: occupiedLabIds } });
    
    res.status(200).json({ availableLabs:availableLabs });
  } catch (error) {
    console.error('Error fetching available labs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports = { addLab, getAllLabs, deleteLab, updateLab , getAvailableLabs};
