const mongoose = require('mongoose');
const { Schema } = mongoose;


const CourtSchema = new Schema({
name: { type: String, required: true },
type: { type: String, enum: ['indoor','outdoor'], required: true },
basePrice: { type: Number, required: true, default: 200 },
isActive: { type: Boolean, default: true }
}, { timestamps: true });


module.exports = mongoose.model('Court', CourtSchema);