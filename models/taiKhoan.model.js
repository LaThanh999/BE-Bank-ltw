const db = require('../utils/db');

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
  add(taiKhoan) {
    return db('taiKhoan').insert(taiKhoan);
  },
  remove(id) {
    return db('taiKhoan').where('id', id).del();
  },
  update(id, taiKhoan) {
    return db('taiKhoan').where('id', id).update(taiKhoan);
  },
};
