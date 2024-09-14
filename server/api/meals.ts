import express from 'express'
import request from 'superagent'
import 'dotenv/config' // Import the enviroment variables using dotenv.

const router = express.Router()

// GET /api/meals - Get all meals
router.get('/', async (req, res) => {
  try {
    const response = await request.get(
      `https://www.themealdb.com/api/json/v2/${process.env.MEALDB_API_KEY}/search.php?s=`,
    )

    if (!response.body || !response.body.meals) {
      throw new Error('Invalid API response')
    }

    res.json(response.body.meals)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send((error as Error).message)
    } else {
      res.status(500).send('Something went wrong')
    }
  }
})

// GET /api/meals/:id - Get a meal by ID
router.get('/:id', async (req, res) => {
  try {
    const response = await request.get(
      `https://www.themealdb.com/api/json/v2/${process.env.MEALDB_API_KEY}/lookup.php?i=${req.params.id}`,
    )

    if (!response.body || !response.body.meals) {
      throw new Error('Invalid API response')
    }

    res.json(response.body.meals[0])
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send((error as Error).message)
    } else {
      res.status(500).send('Something went wrong')
    }
  }
})

// GET /api/v1/meals/ingredients/:q - Get meals by ingredients and category
router.get('/ingredients/:q', async (req, res) => {
  try {
    const ingredientsQuery = req.params.q
    const category = req.query.category as string | undefined

    const response = await request.get(
      `https://www.themealdb.com/api/json/v2/${process.env.MEALDB_API_KEY}/filter.php?i=${ingredientsQuery}`,
    )

    if (!response.body || !response.body.meals) {
      throw new Error('Invalid API response')
    }

    // Fetch meal details in parallel
    const mealDetailsPromises = response.body.meals.map((meal) =>
      request.get(
        `https://www.themealdb.com/api/json/v2/${process.env.MEALDB_API_KEY}/lookup.php?i=${meal.idMeal}`,
      ),
    )

    const mealDetailsResponses = await Promise.all(mealDetailsPromises)
    let meals = mealDetailsResponses.map((res) => res.body.meals[0])

    // Filter meals by category if a category is selected
    if (category) {
      meals = meals.filter((meal) => meal.strCategory === category)
    }

    res.json(meals) // Return detailed meals
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    } else {
      res.status(500).send('Something went wrong')
    }
  }
})

export default router
