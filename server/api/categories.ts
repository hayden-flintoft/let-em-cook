import express from 'express'
import request from 'superagent'
import 'dotenv/config' // Import the enviroment variables using dotenv.

const router = express.Router()

// GET /api/categories - Get all meal categories
router.get('/', async (req, res) => {
  try {
    const response = await request.get(
      `https://www.themealdb.com/api/json/v2/${process.env.MEALDB_API_KEY}/list.php?c=list`,
    )

    if (!response.body || !response.body.meals) {
      throw new Error('Invalid API response')
    }

    // Extracting the meals[] array from the response and sending it as categories[]
    const categories = response.body.meals.map(
      (meal: { strCategory: string }) => meal.strCategory,
    )

    res.json(categories)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    } else {
      res.status(500).send('Something went wrong')
    }
  }
})

export default router
