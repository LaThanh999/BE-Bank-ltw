const db = require('../utils/db');

module.exports = {
  add(value) {
    return db('lichSuGiaoDich').insert(value);
  },
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
    try {
      var result = await db('lichSuGiaoDich as LSGD')
        .leftJoin('taiKhoan as TKNhan', 'LSGD.taiKhoanNguoiNhan', '=', 'TKNhan.maTaiKhoan')
        .leftJoin('taiKhoan as TKGui', 'LSGD.taiKhoanNguoiGui', '=', 'TKGui.maTaiKhoan')
        .where({ taiKhoanNguoiGui: value })
        .orWhere({ taiKhoanNguoiNhan: value })
        .select('LSGD.*', 'TKNhan.hoTen as hoTenNguoiNhan', 'TKGui.hoTen as hoTenNguoiGui')
        .orderBy('id', 'asc');

      if (!result) {
        return null;
      }
      return result;
    } catch (error) {
      console.log('error', error);
      return [];
    }
  },

  remove(id) {
    return db('lichSuGiaoDich').where('id', id).del();
  },
  update(id, lichSuGiaoDich) {
    return db('lichSuGiaoDich').where('id', id).update(lichSuGiaoDich);
  },
};
