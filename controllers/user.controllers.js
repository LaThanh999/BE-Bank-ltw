const userModel = require('../models/users.model');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 10);
  const temp = await userModel.getFindByUsername(user.username);
  if (temp) {
    res.status(409).json({ message: 'Username already exists' });
  }
  const result = await userModel.add(user);
  user.id = result[0];
  res.status(201).json(user);
};
