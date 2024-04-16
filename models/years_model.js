const mongoose = require('mongoose');

const yearSchema = new mongoose.Schema({
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  yearId: { type: Number, required: true, unique: true },
  yearName: { type: String, required: true },
});

const Year = mongoose.model('Year', yearSchema);

module.exports = Year;
