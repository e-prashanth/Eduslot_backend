const Department = require('../models/department_model');

async function addDepartment(req, res) {
  const { departmentName , labsCount, classesCount } = req.body;
  try {
    const department = new Department({ departmentName , labsCount ,classesCount});
    await department.save();
    res.status(201).json({ department });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error)
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
    const result = await Department.findByIdAndDelete(departmentName);
    if (result.deletedCount === 0) {
      throw new Error('Department not found');
    }
    res.status(200).json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateDepartment(req, res) {
  const { departmentId } = req.params;
  const { newDepartmentName } = req.body;
  try {
    const result = await Department.findByIdAndUpdate(departmentId, {
      departmentName: newDepartmentName,
    });
    if (!result) {
      console.log("Department not found:", departmentId); // Add this console log
      return res.status(404).json({ error: "Department not found" });
    }
    res.status(200).json({ message: "Department updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


module.exports = { addDepartment, getAllDepartments, deleteDepartment, updateDepartment };
