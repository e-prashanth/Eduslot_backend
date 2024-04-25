const ClassesForDay = require('../models/classesfortheday_model');

async function addClassesForDay(req, res) {
  const { dayId, timeId, className, departmentId,yearId,labId, classId } = req.body;
  try {
    const newClassesForDay = new ClassesForDay({dayId, timeId, className, departmentId,yearId,labId, classId});
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
    const result = await ClassesForDay.deleteOne({_id: classForDayId });
    if (result.deletedCount === 0) {
      throw new Error('Class for day not found');
    }
    res.status(200).json({ message: 'Class for day deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateClassesForDay(req, res) {
  const { ClassForDayId } = req.params;
  const { newDayId, newTimeId, newClassName,newdepartmentId, newLabId,newYearId, newClassId } = req.body;
  try {
    const result = await ClassesForDay.findByIdAndUpdate(
      ClassForDayId ,
      { dayId: newDayId, timeId: newTimeId, className: newClassName,departmentId:newdepartmentId,yearId:newYearId, labId: newLabId, classId: newClassId}
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
