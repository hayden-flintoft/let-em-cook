/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('user_recipe_reactions').del()
  await knex('user_recipe_reactions').insert([
    { id: 1, user_id: '1', mealdb_id: '52997', reaction: 'like' },
    { id: 2, user_id: '1', mealdb_id: '52998', reaction: 'like' },
    { id: 3, user_id: '2', mealdb_id: '52999', reaction: 'like' },
    { id: 4, user_id: '2', mealdb_id: '52910', reaction: 'red heart' },
  ])
}
