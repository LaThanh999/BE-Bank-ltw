const db = require('../utils/db');

module.exports = {
  getAll() {
    return db('danhSachNguoiNo');
  },
  async getFindById(id) {
    const result = await db('danhSachNguoiNo').where({ id: id });
    if (!result) {
      return null;
    }
    return result[0];
  },
  add(danhSachNguoiNo) {
    return db('danhSachNguoiNo').insert(danhSachNguoiNo);
  },
  remove(id) {
    return db('danhSachNguoiNo').where('id', id).del();
  },
  update(id, danhSachNguoiNo) {
    return db('danhSachNguoiNo').where('id', id).update(danhSachNguoiNo);
  },
};
