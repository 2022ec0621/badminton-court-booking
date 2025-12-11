const Equipment = require('../models/Equipment');

exports.list = async (req, res, next) => {
  try {
    const list = await Equipment.find({});
    res.json(list);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const e = await Equipment.create(req.body);
    res.status(201).json(e);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const e = await Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!e) return res.status(404).json({ error: 'Equipment not found' });
    res.json(e);
  } catch (err) { next(err); }
};
