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

export default router
