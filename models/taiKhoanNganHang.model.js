const db = require('../utils/db');

module.exports = {
  getAll() {
    return db('taiKhoanNganHang');
  },
  async getFindById(id) {
    const result = await db('taiKhoanNganHang').where({ id: id });
    if (!result) {
      return null;
    }
    return result[0];
  },
  add(taiKhoanNganHang) {
    return db('taiKhoanNganHang').insert(taiKhoanNganHang);
  },
  remove(id) {
    return db('taiKhoanNganHang').where('id', id).del();
  },
  update(id, taiKhoanNganHang) {
    return db('taiKhoanNganHang').where('id', id).update(taiKhoanNganHang);
  },
};
