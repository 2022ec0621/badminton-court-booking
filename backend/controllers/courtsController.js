const Court = require('../models/Court');

exports.list = async (req, res, next) => {
  try {
    const courts = await Court.find({});
    res.json(courts);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const c = await Court.create(req.body);
    res.status(201).json(c);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const c = await Court.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!c) return res.status(404).json({ error: 'Court not found' });
    res.json(c);
  } catch (err) { next(err); }
};
