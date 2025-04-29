const mongoose = require("mongoose");

const classesForDaySchema = new mongoose.Schema({
  dayId: { type: mongoose.Schema.Types.ObjectId, ref: "Day", required: true },
  timeId: { type: mongoose.Schema.Types.ObjectId, ref: "time", required: true },
  className: { type: String, required: true },
  sectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Section",
    required: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  yearId: { type: mongoose.Schema.Types.ObjectId, ref: "Year", required: true },
  labId: { type: mongoose.Schema.Types.ObjectId, ref: "Lab", default: null },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    default: null,
  },
});

const ClassesForDay = mongoose.model("ClassesForTheDay", classesForDaySchema);

module.exports = ClassesForDay;
