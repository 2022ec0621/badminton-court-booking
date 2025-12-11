const Equipment = require('../models/Equipment');
const { calculatePrice } = require('../services/priceEngine');

/**
 * POST /api/price/preview
 * Body: { courtId, startTime, endTime, equipment: [{ equipmentId, quantity }], coachId }
 * Returns: pricingBreakdown (basePrice, modifiers, total)
 */
exports.previewPrice = async (req, res, next) => {
  try {
    const { courtId, startTime, endTime, equipment = [], coachId } = req.body;
    if (!courtId || !startTime || !endTime) {
      return res.status(400).json({ error: 'courtId, startTime, and endTime are required' });
    }

    const sTime = new Date(startTime);
    const eTime = new Date(endTime);
    if (isNaN(sTime) || isNaN(eTime) || sTime >= eTime) {
      return res.status(400).json({ error: 'Invalid time range' });
    }

    const enrichedEquipment = [];
    for (const eq of equipment) {
      const eDoc = await Equipment.findById(eq.equipmentId);
      if (!eDoc) continue;
      enrichedEquipment.push({
        equipmentId: eDoc._id,
        name: eDoc.name,
        quantity: eq.quantity,
        pricePerUnit: eDoc.pricePerUnit
      });
    }

    const pricing = await calculatePrice({
      courtId,
      startTime: sTime,
      endTime: eTime,
      equipment: enrichedEquipment,
      coachId
    });

    res.json(pricing);
  } catch (err) {
    next(err);
  }
};
