const db = require('../utils/db');

module.exports = {
  add(value) {
    return db('notifications').insert(value);
  },
  getAll() {
    return db('notifications');
  },
  async getWidthNumberCard(value) {
    const result = await db('notifications')
      .leftJoin('taiKhoan as TKGui', 'notifications.numberCardFrom', '=', 'TKGui.maTaiKhoan')
      .leftJoin('taiKhoan as TKNhan', 'notifications.numberCardTo', '=', 'TKNhan.maTaiKhoan')
      .where({ numberCardTo: value })
      .select('notifications.*', 'TKNhan.hoTen as hoTenNguoiNhan', 'TKGui.hoTen as hoTenNguoiGui')
      .orderBy('id', 'asc');

    if (!result) {
      return null;
    }
    return result;
  },

  remove(id) {
    return db('notifications').where('id', id).del();
  },
  update(id, lichSuGiaoDich) {
    return db('notifications').where('id', id).update(lichSuGiaoDich);
  },
  updateNotify(numberCard) {
    return db('notifications').where('numberCardTo', numberCard).update({ isSeen: 1 });
  },
};
