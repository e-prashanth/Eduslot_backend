const Department = require('../models/department_model');

async function addDepartment(req, res) {
  const { departmentName } = req.body;
  try {
    const department = new Department({ departmentName });
    await department.save();
    res.status(201).json({ department });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllDepartments(req, res) {
  try {
    const departments = await Department.find({}, 'departmentName');
    res.status(200).json({ departments: departments.map(department => department.departmentName) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteDepartment(req, res) {
  const { departmentName } = req.params;
  try {
    const result = await Department.deleteOne({ departmentName });
    if (result.deletedCount === 0) {
      throw new Error('Department not found');
    }
    res.status(200).json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateDepartment(req, res) {
  const { oldDepartmentName } = req.params;
  const { newDepartmentName } = req.body;
  try {
    const result = await Department.updateOne({ departmentName: oldDepartmentName }, { departmentName: newDepartmentName });
    if (result.nModified === 0) {
      throw new Error('Department not found or no changes were made');
    }
    res.status(200).json({ message: 'Department updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { addDepartment, getAllDepartments, deleteDepartment, updateDepartment };
