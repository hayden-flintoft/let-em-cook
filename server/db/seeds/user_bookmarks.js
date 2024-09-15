// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
// export const seed = async function (knex) {
//   // Deletes ALL existing entries
//   await knex('user_bookmarks').del()
//   await knex('user_bookmarks').insert([
//     { id: 1, user_id: '1', mealdb_id: '52997' },
//     { id: 2, user_id: '1', mealdb_id: '52998' },
//     { id: 3, user_id: '2', mealdb_id: '52999' },
//     { id: 4, user_id: '2', mealdb_id: '52910' },
//   ])
// }
