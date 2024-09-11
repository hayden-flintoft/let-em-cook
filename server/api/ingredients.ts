import express from 'express'
import request from 'superagent'
import 'dotenv/config' // Import the environment variables using dotenv.

const router = express.Router()

// GET /api/ingredients - Get all ingredients
router.get('/', async (req, res) => {
  try {
    const response = await request.get(
      `https://www.themealdb.com/api/json/v2/${process.env.MEALDB_API_KEY}/list.php?i=list`,
    )

    if (!response.body || !response.body.meals) {
      throw new Error('Invalid API response')
    }

    // Extract the array of ingredients without wrapping it in an outer object
    const ingredients = response.body.meals.map(
      (meal: {
        idIngredient: string
        strIngredient: string
        strDescription: string
      }) => ({
        idIngredient: meal.idIngredient,
        strIngredient: meal.strIngredient,
        strDescription: meal.strDescription,
      }),
    )

    res.json(ingredients)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    } else {
      res.status(500).send('Something went wrong')
    }
  }
})

// GET list of the ingredients for a recipe?
// router.get('/', async (req, res) => {
//   try {
//     const response = await request.get(
//       `https://www.themealdb.com/api/json/v2/${process.env.MEALDB_API_KEY}/list.php?i=list`,
//     )

//     if (!response.body || !response.body.meals) {
//       throw new Error('Invalid API response')
//     }

//   } catch (error) {
//     if (error instanceof Error) {
//       res.status(500).send(error.message)
//     } else {
//       res.status(500).send('Something went wrong')
//     }
//   }
// })

export default router
