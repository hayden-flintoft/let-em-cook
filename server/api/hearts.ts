import express from 'express'
import request from 'superagent'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const response = await request.get(
      `https://www.themealdb.com/api/json/v2/${process.env.MEALDB_API_KEY}/list.php?a=list`,
    )

    if (!response.body || !response.body.meals) {
      throw new Error('Invalid API response')
    }

    // Extracting areas[] and referring to them as cuisines[]
    const cuisines = response.body.meals.map(
      (meal: { strArea: string }) => meal.strArea,
    )

    res.json(cuisines)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send((error as Error).message)
    } else {
      res.status(500).send('Something went wrong')
    }
  }
})