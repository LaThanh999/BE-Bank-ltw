const userModel = require('../models/users.model');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const user = req.body;
  const userDTO = {};
  userDTO.Username = user.username;
  userDTO.Pass = bcrypt.hashSync(user.password, 10);
  const temp = await userModel.getFindByUsername(userDTO.Username);
  if (temp) {
    res.status(409).json({ message: 'Username already exists' });
  }
  const result = await userModel.add(userDTO);
  user.id = result[0];
  res.status(201).json(user);
};
