const db = require('../utils/db');

module.exports = {
  getAll() {
    return db('danhSachNguoiNhan');
  },

  async getByAccountNumber(value) {


    var result = await db('danhSachNguoiNhan as DSNN ') 
    .join('taiKhoan as TKNhan', 'DSNN.maTaiKhoanNguoiNhan', '=', 'TKNhan.maTaiKhoan')
    .where({ maTaiKhoanNguoiChuyen: value })  
      .select('DSNN.*','TKNhan.hoTen as hoTenNguoiNhan').orderBy('id', 'asc');


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
