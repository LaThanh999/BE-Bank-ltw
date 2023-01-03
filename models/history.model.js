const db = require('../utils/db');

module.exports = {
  add(value) {
    return db('lichSuGiaoDich').insert(value);
  },
};
