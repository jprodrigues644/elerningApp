const dbconfig = require('../knexfile');
const knex = require('knex')(dbconfig);
//knex.migrate.latest(dbconfig);
module.exports = knex;
