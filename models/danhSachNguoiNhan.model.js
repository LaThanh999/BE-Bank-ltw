const db = require('../utils/db');

module.exports = {
  getAll() {
    return db('danhSachNguoiNhan');
  },

  async getByAccountNumber(value) {
    var result = await db('danhSachNguoiNhan').where({ maTaiKhoanNguoiChuyen: value });
    if (!result) {
      return null;
    }
    return result;
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
