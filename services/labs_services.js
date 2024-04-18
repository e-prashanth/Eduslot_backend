const Lab = require('../models/labs_model');

async function addLab(req, res) {
  const { departmentId, labName , departmentName} = req.body;
  try {
    const newLab = new Lab({ departmentId, labName , departmentName});
    await newLab.save();
    res.status(201).json({ newLab });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
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
    const result = await Lab.deleteOne({ labId });
    if (result.deletedCount === 0) {
      throw new Error('Lab not found');
    }
    res.status(200).json({ message: 'Lab deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateLab(req, res) {
  const { oldLabId } = req.params;
  const { newDepartmentId, newLabName, newLabId } = req.body;
  try {
    const result = await Lab.updateOne({ labId: oldLabId }, { departmentId: newDepartmentId, labName: newLabName, labId: newLabId });
    if (result.nModified === 0) {
      throw new Error('Lab not found or no changes were made');
    }
    res.status(200).json({ message: 'Lab updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { addLab, getAllLabs, deleteLab, updateLab };
