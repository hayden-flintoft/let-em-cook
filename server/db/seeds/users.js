/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      username: 'gramsey',
      first_name: 'Gordon',
      last_name: 'Ramsey',
      email: 'gr@email.com',
      auth_token: '123',
    },
    {
      id: 2,
      username: 'joliver',
      first_name: 'Jamie',
      last_name: 'Oliver',
      email: 'jo@email.com',
      auth_token: '124',
    },
  ])
}
