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
