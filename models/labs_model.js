const mongoose = require('mongoose');

const labSchema = new mongoose.Schema({
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  labName: { type: String, required: true },
  labId: { type: Number, required: true, unique: true },
});

const Lab = mongoose.model('Lab', labSchema);

module.exports = Lab;
