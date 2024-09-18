/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('user_likes').del()
  await knex('user_likes').insert([
    { id: 1, clerk_id: 'user_mock1', recipe_id: 52945, is_clicked: true },
    { id: 2, clerk_id: 'user_mock2', recipe_id: 52945, is_clicked: true },
    { id: 3, clerk_id: 'user_mock3', recipe_id: 52945, is_clicked: false },
    { id: 4, clerk_id: 'user_mock4', recipe_id: 52945, is_clicked: true },
    {
      id: 5,
      clerk_id: 'user_2mAXPUMfjw8f2L9OwOJO8CeLAh8',
      recipe_id: 52768,
      is_clicked: true,
    },
    {
      id: 6,
      clerk_id: 'user_2mAXPUMfjw8f2L9OwOJO8CeLAh8',
      recipe_id: 52997,
      is_clicked: true,
    },
    {
      id: 7,
      clerk_id: 'user_2mAXPUMfjw8f2L9OwOJO8CeLAh8',
      recipe_id: 52803,
      is_clicked: false,
    },
    {
      id: 8,
      clerk_id: 'user_2mAXPUMfjw8f2L9OwOJO8CeLAh8',
      recipe_id: 52951,
      is_clicked: true,
    },
    {
      id: 9,
      clerk_id: 'user_2mAXPUMfjw8f2L9OwOJO8CeLAh8',
      recipe_id: 53049,
      is_clicked: true,
    },
    {
      id: 10,
      clerk_id: 'user_2mAXPUMfjw8f2L9OwOJO8CeLAh8',
      recipe_id: 52894,
      is_clicked: true,
    },
    { id: 11, clerk_id: 'user_mock5', recipe_id: 52945, is_clicked: true },
    { id: 12, clerk_id: 'user_mock6', recipe_id: 52945, is_clicked: true },
    { id: 13, clerk_id: 'user_mock7', recipe_id: 52945, is_clicked: true },
    { id: 14, clerk_id: 'user_mock8', recipe_id: 52945, is_clicked: true },
  ])
}
