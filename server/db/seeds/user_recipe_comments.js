/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('user_recipe_comments').del()
  await knex('user_recipe_comments').insert([
    {
      id: 1,
      user_id: '1',
      mealdb_id: '52997',
      comment: 'This is a great recipe!',
    },
    { id: 2, user_id: '1', mealdb_id: '52998', comment: 'I love this recipe!' },
    { id: 3, user_id: '2', mealdb_id: '52999', comment: 'This is' },
    { id: 4, user_id: '2', mealdb_id: '52910', comment: 'Too healthy for me' },
  ])
}
