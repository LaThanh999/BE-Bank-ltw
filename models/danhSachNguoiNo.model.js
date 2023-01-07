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
  async getFindByNumberCard(numberCard, type) {
    /// type = 1 => From
    let result;
    if (type == 1) {
      result = await db('danhSachNguoiNo as DSNN ')
        .join('taiKhoan as TK', 'DSNN.maTaiKhoanChuNo ', '=', 'TK.maTaiKhoan')
        .join('taiKhoan as TK1', 'DSNN.maTaiKhoanNguoiNo', '=', 'TK1.maTaiKhoan')
        .where({ maTaiKhoanChuNo: numberCard })
        .select(
          'TK.hoTen as hoTenChuNo',
          'TK.maNganHang as maNganHangChuNo',
          'TK1.hoTen as hoTenNguoiNo',
          'TK1.maNganHang as maNganHangNguoiNo',
          'DSNN.*',
        );
    }
    /// type = 2 => To
    if (type != 1) {
      result = await db('danhSachNguoiNo as DSNN ')
        .join('taiKhoan as TK', 'DSNN.maTaiKhoanChuNo ', '=', 'TK.maTaiKhoan')
        .join('taiKhoan as TK1', 'DSNN.maTaiKhoanNguoiNo', '=', 'TK1.maTaiKhoan')
        .where({ maTaiKhoanNguoiNo: numberCard })
        .select(
          'TK.hoTen as hoTenChuNo',
          'TK.maNganHang as maNganHangChuNo',
          'TK1.hoTen as hoTenNguoiNo',
          'TK1.maNganHang as maNganHangNguoiNo',
          'DSNN.*',
        );
    }
    if (!result) {
      return null;
    }
    return result;
  },
  add(danhSachNguoiNo) {
    return db('danhSachNguoiNo').insert(danhSachNguoiNo);
  },
  async addOwe(danhSachNguoiNo) {
    try {
      let result;
      await db.transaction(async (trx) => {
        const { soTienChuyen, maTaiKhoanChuNo, maTaiKhoanNguoiNo } = danhSachNguoiNo;
        result = await trx('danhSachNguoiNo').insert(danhSachNguoiNo);
        await trx('notifications').insert({
          numberCardFrom: maTaiKhoanChuNo,
          numberCardTo: maTaiKhoanNguoiNo,
          message: `Thanh toán nhắc nợ ${soTienChuyen} VND`,
          type: 0,
          isSeen: 0,
          money: +soTienChuyen,
          idOwe: result,
        });
      });
      return result;
    } catch (error) {
      console.log('err', error);
    }
  },
  remove(id) {
    return db('danhSachNguoiNo').where('id', id).del();
  },
  update(id, danhSachNguoiNo) {
    return db('danhSachNguoiNo').where('id', id).update(danhSachNguoiNo);
  },
};
