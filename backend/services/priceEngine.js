const PricingRule = require('../models/PricingRule');
const Court = require('../models/Court');
const Coach = require('../models/Coach');

function inTimeRange(date, startHour, endHour) {
  const h = new Date(date).getHours();
  return h >= startHour && h < endHour;
}

/**
 * calculatePrice({
 *   courtId,
 *   startTime,
 *   endTime,
 *   equipment: [{ name, pricePerUnit, quantity }],
 *   coachId
 * })
 */
async function calculatePrice({ courtId, startTime, endTime, equipment = [], coachId = null }) {
  const court = await Court.findById(courtId);
  if (!court) throw new Error('Court not found');

  let base = court.basePrice;
  const modifiers = [];
  const rules = await PricingRule.find({ isActive: true }).sort({ priority: 1 });

  for (const r of rules) {
    if (r.type === 'time_range') {
      const { startHour, endHour, multiplier } = r.config || {};
      if (startHour != null && endHour != null && inTimeRange(startTime, startHour, endHour)) {
        const prev = base;
        base = base * (multiplier || 1);
        modifiers.push({ name: r.name, amount: Number((base - prev).toFixed(2)) });
      }
    } else if (r.type === 'day_of_week') {
      const { days = [], surcharge = 0 } = r.config || {};
      const day = new Date(startTime).getDay();
      if (days.includes(day)) {
        base += surcharge;
        modifiers.push({ name: r.name, amount: Number(surcharge) });
      }
    } else if (r.type === 'court_type') {
      const { courtType, surcharge = 0 } = r.config || {};
      if (court.type === courtType) {
        base += surcharge;
        modifiers.push({ name: r.name, amount: Number(surcharge) });
      }
    } else if (r.type === 'flat') {
      const { amount = 0 } = r.config || {};
      base += amount;
      modifiers.push({ name: r.name, amount: Number(amount) });
    }
  }

  let equipmentCost = 0;
  for (const e of equipment) {
    const itemCost = (e.pricePerUnit || 0) * (e.quantity || 0);
    equipmentCost += itemCost;
    if (itemCost > 0) {
      modifiers.push({ name: `Equipment: ${e.name || e.equipmentId}`, amount: Number(itemCost) });
    }
  }

  let coachCost = 0;
  if (coachId) {
    const coach = await Coach.findById(coachId);
    if (coach) {
      const durationHours = (new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60);
      coachCost = (coach.hourlyRate || 0) * Math.max(durationHours, 0.5);
      modifiers.push({ name: `Coach: ${coach.name}`, amount: Number(coachCost) });
    }
  }

  const total = Number((base + equipmentCost + coachCost).toFixed(2));
  return {
    basePrice: Number(base.toFixed(2)),
    modifiers,
    total
  };
}

module.exports = { calculatePrice };
