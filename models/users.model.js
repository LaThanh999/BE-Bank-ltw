const db = require('../utils/db');
const _ = require('lodash');

module.exports = {
  getAll() {
    return db('users');
  },
  async getFindById(id) {
    const result = await db('users').where({ id: id });
    if (!result) {
      return null;
    }
    return result[0];
  },
  async getFindByUsername(username) {
    const result = await db('users').where({ username: username });
    if (_.isEmpty(result)) {
      return null;
    }
    return result[0];
  },
  add(user) {
    return db('users').insert(user);
  },
  remove(id) {
    return db('users').where('id', id).del();
  },
  update(id, user) {
    return db('users').where('id', id).update(user);
  },
  async isValidRefreshToken(id, refreshToken) {
    const result = await db('users').where({ id: id }).andWhere({ refreshToken: refreshToken });
    if (_.isEmpty(result)) {
      return null;
    }
    return result[0];
  },
};
