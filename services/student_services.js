const Student = require("../models/student_model");
const crypto = require('crypto');

// Add a new student
async function addStudent(req, res) {
  const { RollNumber, Name, SerialNumber, sectionId, yearId, departmentId } = req.body;
  try {
    const newStudent = new Student({ RollNumber, Name, SerialNumber, sectionId, yearId, departmentId });
    await newStudent.save();
    res.status(201).json({ newStudent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Add multiple students from CSV
async function addStudentsFromCSV(req, res) {
  const { students, sectionId, yearId, departmentId } = req.body;

  if (!students || !Array.isArray(students)) {
    return res.status(400).json({ message: "Invalid students data" });
  }

  try {
    // Map students and add sectionId, yearId, and departmentId
    const studentsToInsert = students.map((student) => ({
      RollNumber: student.RollNumber, // Ensure field names match your schema
      Name: student.Name,
      SerialNumber: student.SerialNumber,
      sectionId,
      yearId,
      departmentId,
    }));

    const insertedStudents = [];

    // Insert each student one by one
    for (const student of studentsToInsert) {
      try {
        // Check if the student already exists
        const existingStudent = await Student.findOne({ rollNumber: student.RollNumber });

        if (existingStudent) {
          console.log(`Student with rollNumber ${student.RollNumber} already exists. Skipping.`);
          continue; // Skip this student
        }

        // Insert the student
        const newStudent = await Student.create(student);
        insertedStudents.push(newStudent);
        console.log(`Student with rollNumber ${student.RollNumber} inserted successfully.`);
      } catch (error) {
        console.error(`Error inserting student with rollNumber ${student.RollNumber}:`, error);
      }
    }

    if (insertedStudents.length > 0) {
      res.status(201).json({ message: "Students added successfully", insertedStudents });
    } else {
      res.status(200).json({ message: "No new students were added. All students already exist." });
    }
  } catch (error) {
    console.error("Error in addStudentsFromCSV:", error);
    res.status(500).json({ message: error.message });
  }
}

// Delete a student by roll number
async function deleteStudent(req, res) {
  const { rollNumber } = req.params;
  try {
    const result = await Student.deleteOne({ rollNumber });
    if (result.deletedCount === 0) {
      throw new Error("Student not found");
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get all students
async function getAllStudents(req, res) {
  try {
    const students = await Student.find({}, "rollNumber name serialNumber sectionId yearId departmentId");
    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get a student by roll number
async function getStudentByRollNumber(req, res) {
  const { rollNumber } = req.params;
  try {
    const student = await Student.findOne({ rollNumber });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update a student by roll number
async function updateStudent(req, res) {
  const { rollNumber } = req.params;
  const { name, serialNumber, sectionId, yearId, departmentId } = req.body;
  try {
    const result = await Student.findOneAndUpdate(
      { rollNumber },
      { name, serialNumber, sectionId, yearId, departmentId },
      { new: true }
    );

    if (!result) {
      throw new Error("Student not found or no changes were made");
    }
    res.status(200).json({ message: "Student updated successfully", student: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Search for a student by fingerprint data
async function Search(req, res) {
  const { serialNumber } = req.params;
  console.log(serialNumber);
  try {
    const student = await Student.findOne({SerialNumber:serialNumber});
    if(student){
      console.log(student);
      res.status(200).json(student);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  addStudent,
  addStudentsFromCSV,
  deleteStudent,
  getAllStudents,
  getStudentByRollNumber,
  updateStudent,
  Search
};