const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  court: { type: Schema.Types.ObjectId, ref: 'Court', required: true },
  coach: { type: Schema.Types.ObjectId, ref: 'Coach', default: null },
  equipment: [{
    equipmentId: { type: Schema.Types.ObjectId, ref: 'Equipment' },
    quantity: { type: Number, default: 0 },
    pricePerUnit: { type: Number, default: 0 }
  }],
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: { type: String, enum: ['confirmed','cancelled','waitlist'], default: 'confirmed' },
  pricingBreakdown: {
    basePrice: Number,
    modifiers: [{ name: String, amount: Number }],
    total: Number
  }
}, { timestamps: true });

BookingSchema.index({ court: 1, startTime: 1, endTime: 1 });
BookingSchema.index({ coach: 1, startTime: 1, endTime: 1 });

module.exports = mongoose.model('Booking', BookingSchema);
