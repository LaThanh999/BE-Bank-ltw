const db = require('../utils/db');
const _ = require('lodash');

module.exports = {
  getAll() {
    return db('otpTransfer');
  },

  async getFindById(id) {
    const result = await db('otpTransfer').where({ id: id });
    if (!result) {
      return null;
    }
    return result[0];
  },

  async getFindByNumberCard(numberCardFrom, numberCardTo) {
    const result = await db('otpTransfer')
      .where({ numberCardFrom, numberCardTo })
      .orderBy('update_at', 'desc');
    if (!result) {
      return null;
    }
    return result[0];
  },

  remove(id) {
    return db('otpTransfer').where('id', id).del();
  },

  add(inputOTP) {
    return db('otpTransfer').insert(inputOTP);
  },
  update(id, inputOTP) {
    return db('otpTransfer').where('id', id).update(inputOTP);
  },
};
