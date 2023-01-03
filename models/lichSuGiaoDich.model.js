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
  async getByAccountNumber(value) {
    
    var result = await db('lichSuGiaoDich as LSGD')
      .join('taiKhoan as TKNhan', 'LSGD.taiKhoanNguoiNhan', '=', 'TKNhan.maTaiKhoan')
      .join('taiKhoan as TKGui', 'LSGD.taiKhoanNguoiGui', '=', 'TKGui.maTaiKhoan')
      .where({ taiKhoanNguoiGui: value })
      .orWhere({ taiKhoanNguoiNhan: value })
      .select('LSGD.*', 'TKNhan.hoTen as hoTenNguoiNhan', 'TKGui.hoTen as hoTenNguoiGui')
      .orderBy('id', 'asc');

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
