const db = require('../utils/db');

module.exports = {
  getAll() {
    return db('lichSuGiaoDich');
  },
  async getFindById(id) {
    const result = await db('lichSuGiaoDich').where({ id: id });
    if (!result) {
      return null;
    }
    return result[0];
  },
  async transferMoney(value) {
    var result = await db('lichSuGiaoDich').where({ taiKhoanNguoiGui: value });
    if (!result) {
      return null;
    }
    return result;
  },
  async receiveMoney(value) {
    var result = await db('lichSuGiaoDich').where({ taiKhoanNguoiNhan: value });
    if (!result) {
      return null;
    }
    return result;
  },
  add(lichSuGiaoDich) {
    return db('lichSuGiaoDich').insert(lichSuGiaoDich);
  },
  remove(id) {
    return db('lichSuGiaoDich').where('id', id).del();
  },
  update(id, lichSuGiaoDich) {
    return db('lichSuGiaoDich').where('id', id).update(lichSuGiaoDich);
  },
};
