const { error } = require('winston');
const actorModel = require('../models/actor.model');

exports.getAll = async (req, res) => {
  const result = await actorModel.getAll();
  res.json(result);
};

exports.getById = async (req, res) => {
  const id = +req.params.id || 0;
  if (id === 0) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await actorModel.getFindById(id);
  if (!result) {
    return res.json({ Message: 'Cant not find actor' });
  }
  res.json(result);
};

exports.insert = async (req, res) => {
  const actor = req.body;
  const result = await actorModel.add(actor);
  actor.actor_id = result;
  res.status(201).json(actor);
};

exports.edit = async (req, res) => {
  const id = +req.params.id;
  const actor = req.body;
  const result = await actorModel.update(id, actor);
  if (result === 0) {
    return res.status(304).end();
  }
  res.json(actor);
};

exports.remove = async (req, res) => {
  const id = +req.params.id || 0;
  if (id === 0) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await actorModel.remove(id);
  if (result > 0) {
    res.json({ Message: 'Remove actor successfully' });
  } else {
    return res.json({ Message: 'Please check input' });
  }
};
