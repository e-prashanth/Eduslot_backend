const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  yearId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Year",
    required: true,
  },
  sectionName: {
    type: String,
    required: true,
    index: true,
    unique: true,
    sparse: true,
  },
});

const Section = mongoose.model("Section", sectionSchema);

module.exports = Section;
