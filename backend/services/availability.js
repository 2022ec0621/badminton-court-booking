const Booking = require('../models/Booking');
const Equipment = require('../models/Equipment');
const Coach = require('../models/Coach');

async function isCourtAvailable(courtId, startTime, endTime) {
  const conflict = await Booking.findOne({
    court: courtId,
    status: 'confirmed',
    $or: [
      { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
    ]
  });
  return !conflict;
}

async function isCoachAvailable(coachId, startTime, endTime) {
  if (!coachId) return true;
  const coach = await Coach.findById(coachId);
  if (!coach || !coach.isActive) return false;

  const conflict = await Booking.findOne({
    coach: coachId,
    status: 'confirmed',
    $or: [
      { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
    ]
  });
  return !conflict;
}

async function equipmentAvailable(equipmentId, requestedQty, startTime, endTime) {
  const overlapping = await Booking.aggregate([
    { $match: {
      status: 'confirmed',
      'equipment.equipmentId': equipmentId,
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
      ]
    }},
    { $unwind: '$equipment' },
    { $match: { 'equipment.equipmentId': equipmentId } },
    { $group: { _id: '$equipment.equipmentId', totalBooked: { $sum: '$equipment.quantity' } } }
  ]);
  const alreadyBooked = (overlapping[0] && overlapping[0].totalBooked) || 0;
  const eq = await Equipment.findById(equipmentId);
  if (!eq) throw new Error('Equipment not found');
  return (eq.totalStock - alreadyBooked) >= requestedQty;
}

module.exports = { isCourtAvailable, isCoachAvailable, equipmentAvailable };
