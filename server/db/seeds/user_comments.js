/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('user_comments').del()

  // Insert comments for different users and recipes
  await knex('user_comments').insert([
    // Recipe 52997 Comments
    {
      id: 1,
      clerk_id: 'user_mock1',
      username: 'Rohan',
      recipe_id: 52997,
      comment:
        'This is a great recipe! I made it for my family, and they loved it.',
    },
    {
      id: 2,
      clerk_id: 'user_mock2',
      username: 'David',
      recipe_id: 52997,
      comment:
        'Very easy to make! I will definitely be making this again soon.',
    },
    {
      id: 3,
      clerk_id: 'user_mock3',
      username: 'Gabby',
      recipe_id: 52997,
      comment: "The flavours are fantastic, and it's quick to prepare!",
    },
    {
      id: 4,
      clerk_id: 'user_mock4',
      username: 'KarlWithaK',
      recipe_id: 52997,
      comment:
        'It turned out delicious! I would definitely recommend this recipe.',
    },
    {
      id: 5,
      clerk_id: 'user_mock5',
      username: 'T-Edd',
      recipe_id: 52997,
      comment: 'Perfect balance of flavour and texture. Will make again!',
    },
    {
      id: 6,
      clerk_id: 'user_mock6',
      username: 'Edd',
      recipe_id: 52997,
      comment: 'My kids loved it, and it was so easy to prepare.',
    },

    // Recipe 52768 Comments
    {
      id: 7,
      clerk_id: 'user_mock1',
      username: 'Johnson',
      recipe_id: 52768,
      comment:
        'Loved it! The dish turned out amazing, and the ingredients were simple.',
    },
    {
      id: 8,
      clerk_id: 'user_mock2',
      username: 'StevenF',
      recipe_id: 52768,
      comment: 'Such a hearty and delicious meal. Will make again soon!',
    },
    {
      id: 9,
      clerk_id: 'user_mock3',
      username: 'HaydenF',
      recipe_id: 52768,
      comment: 'The recipe was easy to follow, and the result was fantastic.',
    },
    {
      id: 10,
      clerk_id: 'user_mock4',
      username: 'KarlWithaK',
      recipe_id: 52768,
      comment: 'A great recipe for a family dinner. Everyone loved it!',
    },
    {
      id: 11,
      clerk_id: 'user_mock5',
      username: 'T-Edd',
      recipe_id: 52768,
      comment:
        'I wasn’t sure at first, but this has become one of my go-to meals!',
    },
    {
      id: 12,
      clerk_id: 'user_mock6',
      username: 'Edd',
      recipe_id: 52768,
      comment: 'I followed the recipe exactly, and it turned out perfect.',
    },

    // Recipe 52803 Comments
    {
      id: 13,
      clerk_id: 'user_mock1',
      username: 'Johnson',
      recipe_id: 52803,
      comment:
        'Will definitely try again! The taste was so good and super easy to make.',
    },
    {
      id: 14,
      clerk_id: 'user_mock2',
      username: 'StevenF',
      recipe_id: 52803,
      comment: 'This was perfect for a busy weeknight. Quick and tasty!',
    },
    {
      id: 15,
      clerk_id: 'user_mock3',
      username: 'HaydenF',
      recipe_id: 52803,
      comment:
        'Perfect for a quick weeknight meal. Everyone in the family enjoyed it!',
    },
    {
      id: 16,
      clerk_id: 'user_mock4',
      username: 'KarlWithaK',
      recipe_id: 52803,
      comment: 'A wonderful dish with amazing flavours. Will make again.',
    },
    {
      id: 17,
      clerk_id: 'user_mock5',
      username: 'T-Edd',
      recipe_id: 52803,
      comment:
        'Surprisingly simple and packed with flavour! Highly recommended.',
    },
    {
      id: 18,
      clerk_id: 'user_mock6',
      username: 'Edd',
      recipe_id: 52803,
      comment: 'A new favourite! Super easy to make and delicious.',
    },

    // Recipe 52951 Comments
    {
      id: 19,
      clerk_id: 'user_mock1',
      username: 'Johnson',
      recipe_id: 52951,
      comment: 'Easy to follow instructions! I love how it turned out.',
    },
    {
      id: 20,
      clerk_id: 'user_mock2',
      username: 'StevenF',
      recipe_id: 52951,
      comment:
        'Great recipe! The flavours really came through, and it was so simple to prepare.',
    },
    {
      id: 21,
      clerk_id: 'user_mock3',
      username: 'HaydenF',
      recipe_id: 52951,
      comment: 'This was a hit at the dinner table. Everyone wanted seconds!',
    },
    {
      id: 22,
      clerk_id: 'user_mock4',
      username: 'KarlWithaK',
      recipe_id: 52951,
      comment: 'Loved the step-by-step instructions. Came out perfectly!',
    },
    {
      id: 23,
      clerk_id: 'user_mock5',
      username: 'T-Edd',
      recipe_id: 52951,
      comment: 'My family really enjoyed this meal. Will make it again.',
    },
    {
      id: 24,
      clerk_id: 'user_mock6',
      username: 'Edd',
      recipe_id: 52951,
      comment:
        'Delicious! My guests were impressed. Will be making this again.',
    },

    // Recipe 52945 Comments (newly added)
    {
      id: 25,
      clerk_id: 'user_mock1',
      username: 'Johnson',
      recipe_id: 52945,
      comment: 'This was fantastic! My family couldn’t get enough.',
    },
    {
      id: 26,
      clerk_id: 'user_mock2',
      username: 'StevenF',
      recipe_id: 52945,
      comment: 'Loved the simplicity of this recipe. It’s a keeper!',
    },
    {
      id: 27,
      clerk_id: 'user_mock3',
      username: 'HaydenF',
      recipe_id: 52945,
      comment: 'Quick, easy, and delicious. Will make again for sure.',
    },
    {
      id: 28,
      clerk_id: 'user_mock4',
      username: 'KarlWithaK',
      recipe_id: 52945,
      comment: 'The instructions were easy to follow, and it turned out great!',
    },
    {
      id: 29,
      clerk_id: 'user_mock5',
      username: 'T-Edd',
      recipe_id: 52945,
      comment: 'Really enjoyed this one. Highly recommend!',
    },
    {
      id: 30,
      clerk_id: 'user_mock6',
      username: 'Edd',
      recipe_id: 52945,
      comment: 'This recipe was a hit! Easy to make and full of flavour.',
    },
  ])
}
