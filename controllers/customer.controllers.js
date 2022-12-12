const customerModel = require('../models/customer.model');

exports.getAll = async (req, res) => {
  const result = await customerModel.getAll();
  res.json(result);
};

exports.getById = async (req, res) => {
  const id = +req.params.id || 0;
  if (id === 0) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await customerModel.getFindById(id);
  if (!result) {
    return res.json({ Message: "Can't not find customer" });
  }
  res.json(result);
};

exports.insert = async (req, res) => {
  const customer = req.body;
  const result = await customerModel.add(customer);
  customer.customer_id = result;
  res.status(201).json(customer);
};

exports.edit = async (req, res) => {
  const id = +req.params.id;
  const customer = req.body;
  const result = await customerModel.update(id, customer);
  if (result === 0) {
    return res.status(304).end();
  }
  res.json(customer);
};

exports.remove = async (req, res) => {
  const id = +req.params.id || 0;
  if (id === 0) {
    return res.json({ Message: 'Please check input' });
  }
  const result = await customerModel.remove(id);
  if (result > 0) {
    res.json({ Message: 'Remove customer successfully' });
  } else {
    return res.json({ Message: 'Please check input' });
  }
};
