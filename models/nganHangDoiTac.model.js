const db = require('../utils/db');

module.exports = {
  getAll() {
    return db('nganHangDoiTac');
  },
  async getFindById(id) {
    const result = await db('nganHangDoiTac').where({ id: id });
    if (!result) {
      return null;
    }
    return result[0];
  },
  add(nganHangDoiTac) {
    return db('nganHangDoiTac').insert(nganHangDoiTac);
  },
  remove(id) {
    return db('nganHangDoiTac').where('id', id).del();
  },
  update(id, nganHangDoiTac) {
    return db('nganHangDoiTac').where('id', id).update(nganHangDoiTac);
  },
};
