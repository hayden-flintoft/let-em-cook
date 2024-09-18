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
        'This is a great recipe! It was a hit with everyone I shared it with.',
    },
    {
      id: 2,
      clerk_id: 'user_mock2',
      username: 'David',
      recipe_id: 52997,
      comment: 'Very easy to make! I’ll definitely be making this again soon.',
    },
    {
      id: 3,
      clerk_id: 'user_mock3',
      username: 'Jatin',
      recipe_id: 52997,
      comment: "The flavours were fantastic, and it's quick to prepare!",
    },
    {
      id: 4,
      clerk_id: 'user_mock4',
      username: 'Gabby',
      recipe_id: 52997,
      comment: 'It turned out delicious! I would highly recommend this recipe.',
    },
    {
      id: 5,
      clerk_id: 'user_mock5',
      username: 'Corina',
      recipe_id: 52997,
      comment: 'Perfect balance of flavour and texture. Will make again!',
    },
    {
      id: 6,
      clerk_id: 'user_mock6',
      username: 'Hannah',
      recipe_id: 52997,
      comment: 'This recipe was so easy to follow, and the result was amazing.',
    },
    {
      id: 7,
      clerk_id: 'user_mock7',
      username: 'Rosie',
      recipe_id: 52997,
      comment: 'Everyone loved this recipe, and I’ll make it again for sure.',
    },
    {
      id: 8,
      clerk_id: 'user_mock8',
      username: 'Sarrah',
      recipe_id: 52997,
      comment: 'The recipe was easy to follow, and it tasted great!',
    },
    {
      id: 9,
      clerk_id: 'user_mock9',
      username: 'Rowan',
      recipe_id: 52997,
      comment: 'Quick and delicious! Definitely adding it to my favourites.',
    },
    {
      id: 10,
      clerk_id: 'user_mock10',
      username: 'T-Edd',
      recipe_id: 52997,
      comment: 'A simple recipe with amazing results. Highly recommend it!',
    },
    {
      id: 11,
      clerk_id: 'user_mock11',
      username: 'Ted-D',
      recipe_id: 52997,
      comment: 'This recipe was a success! Easy to make and delicious.',
    },
    {
      id: 12,
      clerk_id: 'user_mock12',
      username: 'KarlWithaK',
      recipe_id: 52997,
      comment: 'This recipe is a keeper. Perfect balance of flavours!',
    },

    // Recipe 52768 Comments
    {
      id: 13,
      clerk_id: 'user_mock1',
      username: 'Rohan',
      recipe_id: 52768,
      comment:
        'Loved it! The dish turned out amazing, and the ingredients were simple.',
    },
    {
      id: 14,
      clerk_id: 'user_mock2',
      username: 'David',
      recipe_id: 52768,
      comment: 'Such a hearty and delicious meal. Will make again soon!',
    },
    {
      id: 15,
      clerk_id: 'user_mock3',
      username: 'Jatin',
      recipe_id: 52768,
      comment: 'The recipe was easy to follow, and the result was fantastic.',
    },
    {
      id: 16,
      clerk_id: 'user_mock4',
      username: 'Gabby',
      recipe_id: 52768,
      comment: 'A great recipe for a dinner. Everyone enjoyed it!',
    },
    {
      id: 17,
      clerk_id: 'user_mock5',
      username: 'Corina',
      recipe_id: 52768,
      comment:
        'I wasn’t sure at first, but this has become one of my go-to meals!',
    },
    {
      id: 18,
      clerk_id: 'user_mock6',
      username: 'Hannah',
      recipe_id: 52768,
      comment: 'I followed the recipe exactly, and it turned out perfect.',
    },
    {
      id: 19,
      clerk_id: 'user_mock7',
      username: 'Rosie',
      recipe_id: 52768,
      comment: 'This recipe was a big hit with my friends! So tasty.',
    },
    {
      id: 20,
      clerk_id: 'user_mock8',
      username: 'Sarrah',
      recipe_id: 52768,
      comment: 'This was so flavourful and easy to make!',
    },
    {
      id: 21,
      clerk_id: 'user_mock9',
      username: 'Rowan',
      recipe_id: 52768,
      comment: 'A fantastic meal! I’ll definitely be making this again.',
    },
    {
      id: 22,
      clerk_id: 'user_mock10',
      username: 'T-Edd',
      recipe_id: 52768,
      comment: 'This recipe is a keeper! Super easy and delicious.',
    },
    {
      id: 23,
      clerk_id: 'user_mock11',
      username: 'Ted-D',
      recipe_id: 52768,
      comment:
        'Turned out great! I’ll definitely be adding this to my favourites.',
    },
    {
      id: 24,
      clerk_id: 'user_mock12',
      username: 'KarlWithaK',
      recipe_id: 52768,
      comment:
        'This recipe is a winner! Simple ingredients and amazing results.',
    },

    // Recipe 52803 Comments
    {
      id: 25,
      clerk_id: 'user_mock1',
      username: 'Rohan',
      recipe_id: 52803,
      comment:
        'Will definitely try again! The taste was so good and super easy to make.',
    },
    {
      id: 26,
      clerk_id: 'user_mock2',
      username: 'David',
      recipe_id: 52803,
      comment: 'This was perfect for a busy weeknight. Quick and tasty!',
    },
    {
      id: 27,
      clerk_id: 'user_mock3',
      username: 'Jatin',
      recipe_id: 52803,
      comment: 'Perfect for a quick weeknight meal. Everyone enjoyed it!',
    },
    {
      id: 28,
      clerk_id: 'user_mock4',
      username: 'Gabby',
      recipe_id: 52803,
      comment: 'A wonderful dish with amazing flavours. Will make again.',
    },
    {
      id: 29,
      clerk_id: 'user_mock5',
      username: 'Corina',
      recipe_id: 52803,
      comment:
        'Surprisingly simple and packed with flavour! Highly recommended.',
    },
    {
      id: 30,
      clerk_id: 'user_mock6',
      username: 'Hannah',
      recipe_id: 52803,
      comment: 'A new favourite! Super easy to make and delicious.',
    },
    {
      id: 31,
      clerk_id: 'user_mock7',
      username: 'Rosie',
      recipe_id: 52803,
      comment: 'So good! The flavours really came together.',
    },
    {
      id: 32,
      clerk_id: 'user_mock8',
      username: 'Sarrah',
      recipe_id: 52803,
      comment: 'The recipe was easy to follow, and the taste was incredible!',
    },
    {
      id: 33,
      clerk_id: 'user_mock9',
      username: 'Rowan',
      recipe_id: 52803,
      comment:
        'Quick, easy, and full of flavour! Will definitely make this again.',
    },
    {
      id: 34,
      clerk_id: 'user_mock10',
      username: 'T-Edd',
      recipe_id: 52803,
      comment: 'This recipe is a keeper. Everyone enjoyed it.',
    },
    {
      id: 35,
      clerk_id: 'user_mock11',
      username: 'Ted-D',
      recipe_id: 52803,
      comment: 'I loved the simplicity of this recipe. Turned out great!',
    },
    {
      id: 36,
      clerk_id: 'user_mock12',
      username: 'KarlWithaK',
      recipe_id: 52803,
      comment: 'I’m definitely saving this recipe for future meals.',
    },

    // Recipe 52951 Comments
    {
      id: 37,
      clerk_id: 'user_mock1',
      username: 'Rohan',
      recipe_id: 52951,
      comment: 'Easy to follow instructions! I love how it turned out.',
    },
    {
      id: 38,
      clerk_id: 'user_mock2',
      username: 'David',
      recipe_id: 52951,
      comment:
        'Great recipe! The flavours really came through, and it was simple to prepare.',
    },
    {
      id: 39,
      clerk_id: 'user_mock3',
      username: 'Jatin',
      recipe_id: 52951,
      comment: 'This was a hit at dinner. Everyone wanted seconds!',
    },
    {
      id: 40,
      clerk_id: 'user_mock4',
      username: 'Gabby',
      recipe_id: 52951,
      comment: 'Loved the step-by-step instructions. Came out perfectly!',
    },
    {
      id: 41,
      clerk_id: 'user_mock5',
      username: 'Corina',
      recipe_id: 52951,
      comment: 'My friends really enjoyed this meal. Will make again.',
    },
    {
      id: 42,
      clerk_id: 'user_mock6',
      username: 'Hannah',
      recipe_id: 52951,
      comment: 'Delicious! Everyone was impressed. Will be making this again.',
    },
    {
      id: 43,
      clerk_id: 'user_mock7',
      username: 'Rosie',
      recipe_id: 52951,
      comment: 'The flavours were fantastic! This is a new favourite recipe.',
    },
    {
      id: 44,
      clerk_id: 'user_mock8',
      username: 'Sarrah',
      recipe_id: 52951,
      comment: 'Simple to make and so tasty. Highly recommend.',
    },
    {
      id: 45,
      clerk_id: 'user_mock9',
      username: 'Rowan',
      recipe_id: 52951,
      comment: 'This turned out amazing! Will definitely make again.',
    },
    {
      id: 46,
      clerk_id: 'user_mock10',
      username: 'T-Edd',
      recipe_id: 52951,
      comment: 'This recipe is a keeper. Perfect for a casual dinner.',
    },
    {
      id: 47,
      clerk_id: 'user_mock11',
      username: 'Ted-D',
      recipe_id: 52951,
      comment: 'The recipe was easy to follow, and the taste was incredible!',
    },
    {
      id: 48,
      clerk_id: 'user_mock12',
      username: 'KarlWithaK',
      recipe_id: 52951,
      comment: 'Loved it! This recipe is one of my new favourites.',
    },

    // Recipe 52945 Comments (newly added)
    {
      id: 49,
      clerk_id: 'user_mock1',
      username: 'Rohan',
      recipe_id: 52945,
      comment: 'This was fantastic! Everyone enjoyed it.',
    },
    {
      id: 50,
      clerk_id: 'user_mock2',
      username: 'David',
      recipe_id: 52945,
      comment: 'Loved the simplicity of this recipe. It’s a keeper!',
    },
    {
      id: 51,
      clerk_id: 'user_mock3',
      username: 'Jatin',
      recipe_id: 52945,
      comment: 'Quick, easy, and delicious. Will make again for sure.',
    },
    {
      id: 52,
      clerk_id: 'user_mock4',
      username: 'Gabby',
      recipe_id: 52945,
      comment: 'The instructions were easy to follow, and it turned out great!',
    },
    {
      id: 53,
      clerk_id: 'user_mock5',
      username: 'Corina',
      recipe_id: 52945,
      comment: 'Really enjoyed this one. Highly recommend!',
    },
    {
      id: 54,
      clerk_id: 'user_mock6',
      username: 'Hannah',
      recipe_id: 52945,
      comment: 'This recipe was a hit! Easy to make and full of flavour.',
    },
    {
      id: 55,
      clerk_id: 'user_mock7',
      username: 'Rosie',
      recipe_id: 52945,
      comment: 'This recipe was so simple, and it tasted great.',
    },
    {
      id: 56,
      clerk_id: 'user_mock8',
      username: 'Sarrah',
      recipe_id: 52945,
      comment: 'Turned out perfectly! I’ll be making it again soon.',
    },
    {
      id: 57,
      clerk_id: 'user_mock9',
      username: 'Rowan',
      recipe_id: 52945,
      comment: 'Such a delicious meal! Quick and easy to prepare.',
    },
    {
      id: 58,
      clerk_id: 'user_mock10',
      username: 'T-Edd',
      recipe_id: 52945,
      comment: 'This recipe is a must-try. Tastes amazing!',
    },
    {
      id: 59,
      clerk_id: 'user_mock11',
      username: 'Ted-D',
      recipe_id: 52945,
      comment: 'I loved how simple and tasty this recipe turned out.',
    },
    {
      id: 60,
      clerk_id: 'user_mock12',
      username: 'KarlWithaK',
      recipe_id: 52945,
      comment: 'This recipe is a keeper! Tasted amazing.',
    },
  ])
}
