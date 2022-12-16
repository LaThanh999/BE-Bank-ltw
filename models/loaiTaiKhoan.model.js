const db = require('../utils/db');

module.exports = {
  getAll() {
    return db('loaiTaiKhoan');
  },
  async getFindById(id) {
    const result = await db('loaiTaiKhoan').where({ id: id });
    if (!result) {
      return null;
    }
    return result[0];
  },
  add(loaiTaiKhoan) {
    return db('loaiTaiKhoan').insert(loaiTaiKhoan);
  },
  remove(id) {
    return db('loaiTaiKhoan').where('id', id).del();
  },
  update(id, loaiTaiKhoan) {
    return db('loaiTaiKhoan').where('id', id).update(loaiTaiKhoan);
  },
};
