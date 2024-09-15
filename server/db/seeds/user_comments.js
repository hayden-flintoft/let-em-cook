/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('user_comments').del()
  await knex('user_comments').insert([
    {
      id: 1,
      clerk_id: 'user_2lqxdufQ8szw1Wpdngv7DZsAXxT',
      recipe_id: '52997',
      comment: 'This is a great recipe!',
    },
  ])
}
