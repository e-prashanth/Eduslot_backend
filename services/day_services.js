const Day = require('../models/day_model');

async function addDay(req, res) {
  const { departmentId, yearId, dayName } = req.body;
  try {
    const newDay = new Day({ departmentId, yearId, dayName});
    await newDay.save();
    res.status(201).json({ newDay });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllDays(req, res) {
  try {
    const days = await Day.find({}, 'departmentId yearId dayName dayId');
    res.status(200).json({ days });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteDay(req, res) {
  const { dayId } = req.params;
  try {
    const result = await Day.deleteOne({_id: dayId });
    if (result.deletedCount === 0) {
      throw new Error('Day not found');
    }
    res.status(200).json({ message: 'Day deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateDay(req, res) {
  const { dayId } = req.params;
  const { newDepartmentId, newYearId, newDayName} = req.body;
  try {
    const result = await Day.findByIdAndUpdate(dayId, { departmentId: newDepartmentId, yearId: newYearId, dayName: newDayName });
    if (result.nModified === 0) {
      throw new Error('Day not found or no changes were made');
    }
    res.status(200).json({ message: 'Day updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { addDay, getAllDays, deleteDay, updateDay };
