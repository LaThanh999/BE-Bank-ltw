const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: process.env.HOST_DATABASE,
    port: process.env.PORT_DATABASE,
    user: process.env.USERNAME_DATABASE,
    password: process.env.PASSWORD_DATABASE,
    database: process.env.DATABASE,
  },
  pool: { min: 0, max: 50 },
});

module.exports = knex;
