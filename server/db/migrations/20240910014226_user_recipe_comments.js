/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable('user_recipe_comments', (table) => {
    table.increments('id').primary()
    table.integer('user_id')
    table.integer('mealdb_id')
    table.string('comment')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable('user_recipe_comments')
}
