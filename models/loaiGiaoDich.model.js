const db = require('../utils/db');

module.exports = {
  getAll() {
    return db('loaiGiaoDich');
  },
  async getFindById(id) {
    const result = await db('loaiGiaoDich').where({ id: id });
    if (!result) {
      return null;
    }
    return result[0];
  },
  async getFindByMaGD(value) {
    const result = await db('loaiGiaoDich').where({ maLoaiChuyenKhoan: value });
    if (!result) {
      return null;
    }
    return result[0];
  },
  add(loaiGiaoDich) {
    return db('loaiGiaoDich').insert(loaiGiaoDich);
  },
  remove(id) {
    return db('loaiGiaoDich').where('id', id).del();
  },
  update(id, loaiGiaoDich) {
    return db('loaiGiaoDich').where('id', id).update(loaiGiaoDich);
  },
};
