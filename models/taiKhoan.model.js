const db = require('../utils/db');
const _ = require('lodash');

module.exports = {
  getAll() {
    return db('taiKhoan');
  },

  async getFindById(id) {
    const result = await db('taiKhoan').where({ id: id });
    if (!result) {
      return null;
    }
    return result[0];
  },

  async getWithUsernameOrEmail(value) {
    const result = await db('taiKhoan').where({ taiKhoan: value }).orWhere({ email: value });
    if (_.isEmpty(result)) {
      return null;
    }
    return result[0];
  },

  remove(id) {
    return db('taiKhoan').where('id', id).del();
  },

  add(user) {
    return db('taiKhoan').insert(user);
  },
  update(id, user) {
    return db('taiKhoan').where('id', id).update(user);
  },
};
