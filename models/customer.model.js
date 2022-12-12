const db = require('../utils/db');

module.exports = {
  getAll() {
    return db('customer');
  },
  async getFindById(id) {
    const result = await db('customer').where({ customer_id: id });
    if (!result) {
      return null;
    }
    return result[0];
  },
  add(customer) {
    return db('customer').insert(customer);
  },
  remove(id) {
    return db('customer').where('customer_id', id).del();
  },
  update(id, customer) {
    return db('customer').where('customer_id', id).update(customer);
  },
};
