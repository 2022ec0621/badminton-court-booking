const PricingRule = require('../models/PricingRule');

exports.list = async (req, res, next) => {
  try {
    const list = await PricingRule.find({});
    res.json(list);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const rule = await PricingRule.create(req.body);
    res.status(201).json(rule);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const rule = await PricingRule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!rule) return res.status(404).json({ error: 'Pricing rule not found' });
    res.json(rule);
  } catch (err) { next(err); }
};
