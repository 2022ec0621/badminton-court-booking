const mongoose = require('mongoose');
const { Schema } = mongoose;

const PricingRuleSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['time_range','day_of_week','court_type','flat','multiplier'], required: true },
  config: { type: Schema.Types.Mixed, default: {} }, // flexible settings
  priority: { type: Number, default: 1 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('PricingRule', PricingRuleSchema);
