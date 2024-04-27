const Class = require('../models/classes_model');

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
    const classes = await Class.find({}, 'departmentId classNumber classId');
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

module.exports = { addClass, getAllClasses, deleteClass, updateClass };
