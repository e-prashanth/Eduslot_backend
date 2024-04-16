const ClassesForDay = require('../models/classesfortheday_model');

async function addClassesForDay(req, res) {
  const { dayId, time, className, labId, classId, classForDayId } = req.body;
  try {
    const newClassesForDay = new ClassesForDay({ dayId, time, className, labId, classId, classForDayId });
    await newClassesForDay.save();
    res.status(201).json({ newClassesForDay });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllClassesForDay(req, res) {
  try {
    const classesForDay = await ClassesForDay.find({}, 'dayId time className labId classId classForDayId');
    res.status(200).json({ classesForDay });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteClassesForDay(req, res) {
  const { classForDayId } = req.params;
  try {
    const result = await ClassesForDay.deleteOne({ classForDayId });
    if (result.deletedCount === 0) {
      throw new Error('Class for day not found');
    }
    res.status(200).json({ message: 'Class for day deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateClassesForDay(req, res) {
  const { oldClassForDayId } = req.params;
  const { newDayId, newTime, newClassName, newLabId, newClassId, newClassForDayId } = req.body;
  try {
    const result = await ClassesForDay.updateOne(
      { classForDayId: oldClassForDayId },
      { dayId: newDayId, time: newTime, className: newClassName, labId: newLabId, classId: newClassId, classForDayId: newClassForDayId }
    );
    if (result.nModified === 0) {
      throw new Error('Class for day not found or no changes were made');
    }
    res.status(200).json({ message: 'Class for day updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { addClassesForDay, getAllClassesForDay, deleteClassesForDay, updateClassesForDay };
