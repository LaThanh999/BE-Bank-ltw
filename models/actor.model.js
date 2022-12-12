const db = require('../utils/db');

module.exports = {
  getAll() {
    return db('actor');
  },
  async getFindById(id) {
    const result = await db('actor').where({ actor_id: id });
    if (!result) {
      return null;
    }
    return result[0];
  },
  add(actor) {
    return db('actor').insert(actor);
  },
  remove(id) {
    return db('actor').where('actor_id', id).del();
  },
  update(id, actor) {
    return db('actor').where('actor_id', id).update(actor);
  },
};
