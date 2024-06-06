/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
   return knex.schema.createTable('articles', function(table){
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('description',1500).notNullable();
    table.string('imageUrl',500);
    table.binary('content').notNullable();
    table.integer('userId').references('id').inTable('users').notNullable();
    table.integer('categoriesId').references('id').inTable('categories').notNullable();
   })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('articles')
};
