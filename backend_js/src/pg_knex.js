// knex db
const knex = require('knex')
const pg = require('knex')({
  client: 'pg',
  connection: {
    user : 'postgres',
    password : 'deepfreeze',
    database : '470project'
  },
  ssl: true
});

module.exports = pg