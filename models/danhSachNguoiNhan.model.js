const db = require('../utils/db');

module.exports = {
  getAll() {
    return db('danhSachNguoiNhan');
  },
  async getFindById(id) {
    const result = await db('danhSachNguoiNhan').where({ id: id });
    if (!result) {
      return null;
    }
    return result[0];
  },
  add(danhSachNguoiNhan) {
    return db('danhSachNguoiNhan').insert(danhSachNguoiNhan);
  },
  remove(id) {
    return db('danhSachNguoiNhan').where('id', id).del();
  },
  update(id, danhSachNguoiNhan) {
    return db('danhSachNguoiNhan').where('id', id).update(danhSachNguoiNhan);
  },
};
