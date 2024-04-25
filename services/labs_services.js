const Lab = require('../models/labs_model');

async function addLab(req, res) {
  const { departmentId, labName} = req.body;
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
    const labs = await Lab.find({}, 'departmentId labName labId');
    res.status(200).json({ labs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteLab(req, res) {
  const { labId } = req.params;
  try {
    const result = await Lab.deleteOne({_id: labId });
    if (result.deletedCount === 0) {
      throw new Error('Lab not found');
    }
    res.status(200).json({ message: 'Lab deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateLab(req, res) {
  const { labId } = req.params;
  const { newDepartmentId, newLabName } = req.body;
  try {
    const result = await Lab.findByIdAndUpdate(labId,{ departmentId: newDepartmentId, labName: newLabName});
    if (result.nModified === 0) {
      throw new Error('Lab not found or no changes were made');
    }
    res.status(200).json({ message: 'Lab updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { addLab, getAllLabs, deleteLab, updateLab };
