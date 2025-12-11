const Coach = require('../models/Coach');

exports.list = async (req, res, next) => {
  try {
    const list = await Coach.find({});
    res.json(list);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const c = await Coach.create(req.body);
    res.status(201).json(c);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const c = await Coach.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!c) return res.status(404).json({ error: 'Coach not found' });
    res.json(c);
  } catch (err) { next(err); }
};
