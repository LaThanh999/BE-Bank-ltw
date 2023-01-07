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
  async getFindByUsername(username) {
    const result = await db('taiKhoan').where({ Username: username });
    if (_.isEmpty(result)) {
      return null;
    }
    return result[0];
  },
  add(user) {
    return db('taiKhoan').insert(user);
  },
  remove(id) {
    return db('taiKhoan').where('id', id).del();
  },
  update(id, user) {
    return db('taiKhoan').where('id', id).update(user);
  },
  async isValidRefreshToken(id, refreshToken) {
    const result = await db('taiKhoan').where({ id: id }).andWhere({ refreshToken: refreshToken });
    if (_.isEmpty(result)) {
      return null;
    }
    return result[0];
  },
};
