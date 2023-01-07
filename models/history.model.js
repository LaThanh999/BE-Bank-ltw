const db = require('../utils/db');

module.exports = {
  add(value) {
    return db('lichSuGiaoDich').insert(value);
  },
  async getAll() {
    var result = await db('lichSuGiaoDich as LSGD')
      .join('taiKhoan as TKNhan', 'LSGD.taiKhoanNguoiNhan', '=', 'TKNhan.maTaiKhoan')

      .join("nganHangDoiTac as NganHangNhan", 'LSGD.idNganHangNhan', '=', 'NganHangNhan.id')
      .join("nganHangDoiTac as NganHangGui", 'LSGD.idNganHangGui', '=', 'NganHangGui.id')
      .where('LSGD.idNganHangNhan',4)
      .andWhere('LSGD.idNganHangGui', 4)
      .select('LSGD.*', 'TKNhan.hoTen as hoTenNguoiNhan', 'NganHangNhan.tenNganHang as tenNganHangNhan', 'NganHangGui.tenNganHang as tenNganHangGui')
      .orderBy('id', 'asc');
      
    if (!result) {
      return null;
    }
    return result;
  },
  async getAllAnotherBank() {
    var result = await db('lichSuGiaoDich as LSGD')
      .join('taiKhoan as TKNhan', 'LSGD.taiKhoanNguoiNhan', '=', 'TKNhan.maTaiKhoan')
      .join("nganHangDoiTac as NganHangNhan", 'LSGD.idNganHangNhan', '=', 'NganHangNhan.id')
      .join("nganHangDoiTac as NganHangGui", 'LSGD.idNganHangGui', '=', 'NganHangGui.id')
      .whereNot('LSGD.idNganHangNhan',4)
      .orWhereNot('LSGD.idNganHangGui', 4)
      .select('LSGD.*', 'TKNhan.hoTen as hoTenNguoiNhan', 'NganHangNhan.tenNganHang as tenNganHangNhan', 'NganHangGui.tenNganHang as tenNganHangGui')
      .orderBy('id', 'asc');
      

    if (!result) {
      return null;
    }
    return result;
  },
  async getFindById(id) {
    const result = await db('lichSuGiaoDich').where({ id: id });
    if (!result) {
      return null;
    }
    return result[0];
  },
  async getByBankID(id) {
    try {
      var result = await db('lichSuGiaoDich as LSGD')
        .join('taiKhoan as TKNhan', 'LSGD.taiKhoanNguoiNhan', '=', 'TKNhan.maTaiKhoan')
        .join('taiKhoan as TKGui', 'LSGD.taiKhoanNguoiGui', '=', 'TKGui.maTaiKhoan')
        .join("nganHangDoiTac as NganHangNhan", 'LSGD.idNganHangNhan', '=', 'NganHangNhan.id')
        .join("nganHangDoiTac as NganHangGui", 'LSGD.idNganHangGui', '=', 'NganHangGui.id')
        .where({ idNganHangGui: id })
        .orWhere({ idNganHangNhan: id })
        .select('LSGD.*', 'TKNhan.hoTen as hoTenNguoiNhan', 'TKGui.hoTen as hoTenNguoiGui', 'NganHangNhan.tenNganHang as tenNganHangNhan', 'NganHangGui.tenNganHang as tenNganHangGui')
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
