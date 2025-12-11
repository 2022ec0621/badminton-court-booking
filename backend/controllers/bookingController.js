const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const Equipment = require('../models/Equipment');
const { isCourtAvailable, isCoachAvailable, equipmentAvailable } = require('../services/availability');
const { calculatePrice } = require('../services/priceEngine');

exports.createBooking = async (req, res, next) => {
  const { courtId, coachId, equipment = [], startTime, endTime } = req.body;

  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
  if (!courtId || !startTime || !endTime) {
    return res.status(400).json({ error: 'courtId, startTime, and endTime are required' });
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const sTime = new Date(startTime);
    const eTime = new Date(endTime);
    if (isNaN(sTime) || isNaN(eTime) || sTime >= eTime) {
      throw new Error('Invalid time range');
    }

    const courtFree = await isCourtAvailable(courtId, sTime, eTime);
    if (!courtFree) throw new Error('Court not available for this slot');

    const coachFree = await isCoachAvailable(coachId, sTime, eTime);
    if (!coachFree) throw new Error('Coach not available or inactive');

    const enrichedEquipment = [];
    for (const eq of equipment) {
      const ok = await equipmentAvailable(eq.equipmentId, eq.quantity, sTime, eTime);
      if (!ok) throw new Error('Equipment not available in requested quantity');
      const eDoc = await Equipment.findById(eq.equipmentId).session(session);
      if (!eDoc) throw new Error('Equipment not found');
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

    const booking = new Booking({
      user: req.user.id,
      court: courtId,
      coach: coachId || null,
      equipment: enrichedEquipment.map(e => ({
        equipmentId: e.equipmentId,
        quantity: e.quantity,
        pricePerUnit: e.pricePerUnit
      })),
      startTime: sTime,
      endTime: eTime,
      pricingBreakdown: {
        basePrice: pricing.basePrice,
        modifiers: pricing.modifiers,
        total: pricing.total
      }
    });

    await booking.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ booking });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error('Booking error', err);
    res.status(400).json({ error: err.message || 'Booking failed' });
  }
};

exports.getBookingsForCurrentUser = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
    const list = await Booking.find({ user: req.user.id })
      .populate('court coach equipment.equipmentId');
    res.json(list);
  } catch (err) { next(err); }
};
