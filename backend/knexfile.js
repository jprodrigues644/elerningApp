// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const connect = require('./.env')
module.exports = {
    client: 'pg',
    connection: connect.connection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  };


