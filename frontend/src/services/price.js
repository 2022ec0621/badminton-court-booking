import api from '../api/index';

// NOTE: Right now preview uses frontend calculation.
// Later we can switch to a backend endpoint (e.g. POST /price/preview) to avoid duplication.

function inTimeRange(date, startHour, endHour) {
  const h = new Date(date).getHours();
  return h >= startHour && h < endHour;
}5

export async function loadActiveRules() {
  const list = await api.get('/pricing-rules').then(r => r.data);
  return list.filter(r => r.isActive);
}

export async function calculatePrice({ court, startTime, endTime, equipment = [], coach = null }) {
  let base = Number(court.basePrice || 0);
  const modifiers = [];
  const rules = await loadActiveRules();

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

  const equipmentCost = equipment.reduce((s, e) => s + ((e.pricePerUnit || 0) * (e.quantity||0)), 0);
  if (equipmentCost > 0) modifiers.push({ name: 'Equipment', amount: Number(equipmentCost) });

  let coachCost = 0;
  if (coach) {
    const durationHours = Math.max(0.5, (new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60));
    coachCost = (coach.hourlyRate || 0) * durationHours;
    modifiers.push({ name: `Coach: ${coach.name}`, amount: Number(coachCost) });
  }

  const total = Number((base + equipmentCost + coachCost).toFixed(2));
  return { basePrice: Number(base.toFixed(2)), modifiers, total };
}
