const Year = require('../models/years_model');

async function addYear(req, res) {
  const { departmentId, yearName } = req.body;
  try {
    const newYear = new Year({ departmentId, yearName });
    await newYear.save();
    res.status(201).json({ newYear });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllYears(req, res) {
  try {
    const years = await Year.find({}, 'departmentId yearId yearName');
    res.status(200).json({ years });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteYear(req, res) {
  const { yearId } = req.params;
  try {
    const result = await Year.deleteOne({_id: yearId });
    if (result.deletedCount === 0) {
      throw new Error('Year not found');
    }
    res.status(200).json({ message: 'Year deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateYear(req, res) {
  const { yearId } = req.params;
  const { newDepartmentId, newYearName } = req.body;
  try {
    const result = await Year.findByIdAndUpdate(yearId, { departmentId: newDepartmentId, yearName: newYearName });
    if (result.nModified === 0) {
      throw new Error('Year not found or no changes were made');
    }
    res.status(200).json({ message: 'Year updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { addYear, getAllYears, deleteYear, updateYear };
