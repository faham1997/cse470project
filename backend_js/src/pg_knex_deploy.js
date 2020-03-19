// knex db
const knex = require('knex')
const pg = knex({
  client: 'pg',
  connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true
  }
});

module.exports = pg;