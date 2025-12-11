const mongoose = require('mongoose');
const { Schema } = mongoose;

const EquipmentSchema = new Schema({
  name: { type: String, required: true },
  totalStock: { type: Number, required: true, default: 0 },
  pricePerUnit: { type: Number, required: true, default: 10 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Equipment', EquipmentSchema);
