const mongoose = require('mongoose');
const { Schema } = mongoose;

const CoachSchema = new Schema({
  name: { type: String, required: true },
  hourlyRate: { type: Number, required: true, default: 150 },
  isActive: { type: Boolean, default: true } // admin can toggle
}, { timestamps: true });

module.exports = mongoose.model('Coach', CoachSchema);
