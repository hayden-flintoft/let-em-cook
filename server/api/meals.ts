import express from 'express'
import request from 'superagent'
import { Request, Response } from 'express'

import 'dotenv/config' // Import the enviroment variables using dotenv.

const router = express.Router()

router.get('/search', async (req: Request, res: Response) => {
  try {
    const ingredients = req.query.ingredients as string | undefined // comma-separated
    const category = req.query.category as string | undefined
    const cuisine = req.query.cuisine as string | undefined
    const page = parseInt(req.query.page as string) || 1
    const mealsPerPage = 10

    let meals: any[] = []

    // Determine the initial list to fetch
    if (ingredients) {
      // Fetch meals by ingredients
      const response = await request.get(
        `https://www.themealdb.com/api/json/v2/${process.env.MEALDB_API_KEY}/filter.php?i=${ingredients}`,
      )
      meals = response.body.meals || []
    } else if (category) {
      // Fetch meals by category
      const response = await request.get(
        `https://www.themealdb.com/api/json/v2/${process.env.MEALDB_API_KEY}/filter.php?c=${encodeURIComponent(
          category,
        )}`,
      )
      meals = response.body.meals || []
    } else if (cuisine) {
      // Fetch meals by cuisine
      const response = await request.get(
        `https://www.themealdb.com/api/json/v2/${process.env.MEALDB_API_KEY}/filter.php?a=${encodeURIComponent(
          cuisine,
        )}`,
      )
      meals = response.body.meals || []
    } else {
      // Fetch 9 random meals
      const randomMealPromises = Array.from({ length: 9 }, () =>
        request.get(
          `https://www.themealdb.com/api/json/v2/${process.env.MEALDB_API_KEY}/random.php`,
        ),
      )
      const randomMealResponses = await Promise.all(randomMealPromises)
      meals = randomMealResponses
        .map((res) => res.body.meals[0])
        .filter((meal) => meal !== undefined)
      return res.json({
        meals,
        totalMeals: meals.length,
        hasMore: false, // No pagination for random meals
      })
    }

    if (meals.length === 0) {
      return res.json({ meals: [], totalMeals: 0, hasMore: false })
    }

    // Fetch detailed meal information
    const mealDetailsPromises = meals.map((meal) =>
      request.get(
        `https://www.themealdb.com/api/json/v2/${process.env.MEALDB_API_KEY}/lookup.php?i=${meal.idMeal}`,
      ),
    )

    const mealDetailsResponses = await Promise.all(mealDetailsPromises)
    let detailedMeals = mealDetailsResponses.map((res) => res.body.meals[0])

    // Apply additional filters locally
    if (ingredients && detailedMeals.length > 0) {
      const ingredientList = ingredients
        .split(',')
        .map((i) => i.trim().toLowerCase())
      detailedMeals = detailedMeals.filter((meal) => {
        const mealIngredients = []
        for (let i = 1; i <= 20; i++) {
          const ingredient = meal[`strIngredient${i}`]
          if (ingredient) mealIngredients.push(ingredient.toLowerCase())
        }
        return ingredientList.every((i) => mealIngredients.includes(i))
      })
    }

    if (category) {
      detailedMeals = detailedMeals.filter(
        (meal) => meal.strCategory.toLowerCase() === category.toLowerCase(),
      )
    }

    if (cuisine) {
      detailedMeals = detailedMeals.filter(
        (meal) => meal.strArea.toLowerCase() === cuisine.toLowerCase(),
      )
    }

    // Paginate results
    const totalMeals = detailedMeals.length
    const startIndex = (page - 1) * mealsPerPage
    const endIndex = startIndex + mealsPerPage
    const paginatedMeals = detailedMeals.slice(startIndex, endIndex)

    res.json({
      meals: paginatedMeals,
      totalMeals,
      hasMore: endIndex < totalMeals,
    })
  } catch (error) {
    console.error('Error in /search:', error)
    if (error instanceof Error) {
      res.status(500).send(error.message)
    } else {
      res.status(500).send('Something went wrong')
    }
  }
})

// GET /api/v1/meals/latest - Get the latest meals
router.get('/latest', async (req, res) => {
  try {
    const response = await request.get(
      `https://www.themealdb.com/api/json/v2/${process.env.MEALDB_API_KEY}/latest.php`,
    )

    if (!response.body || !response.body.meals) {
      throw new Error('Invalid API response')
    }

    res.json(response.body.meals)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    } else {
      res.status(500).send('Something went wrong')
    }
  }
})

// GET /api/v1/meals/random - Get a random meal
router.get('/random', async (req, res) => {
  try {
    const response = await request.get(
      `https://www.themealdb.com/api/json/v2/${process.env.MEALDB_API_KEY}/random.php`,
    )

    if (!response.body || !response.body.meals) {
      throw new Error('Invalid API response')
    }

    res.json({ meals: response.body.meals })
  } catch (error) {
    console.error('Error in /random:', error)
    if (error instanceof Error) {
      res.status(500).send(error.message)
    } else {
      res.status(500).send('Something went wrong')
    }
  }
})

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

// GET /api/v1/meals/ingredients/:q - Get meals by ingredients, category, and cuisine
router.get('/ingredients/:q', async (req, res) => {
  try {
    const ingredientsQuery = req.params.q
    const category = req.query.category as string | undefined
    const cuisine = req.query.cuisine as string | undefined

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

    // Filter meals by cuisine if a cuisine is selected
    if (cuisine) {
      meals = meals.filter((meal) => meal.strArea === cuisine)
    }

    const mealsPerPage = 10
    const page = parseInt(req.query.page) || 1
    const startIndex = (page - 1) * mealsPerPage
    const endIndex = startIndex + mealsPerPage

    res.json(meals.slice(startIndex, endIndex))
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
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
