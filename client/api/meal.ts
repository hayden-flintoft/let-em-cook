import request from 'superagent'
import { Meal, MealList } from '../../models/meals'

const serverURL = '/api/v1'

// GET /api/v1/meals/id - Get a meal by its ID
export async function getMealById(mealId: string): Promise<Meal> {
  const response = await request.get(`${serverURL}/meals/${mealId}`)
  return response.body
}

// GET /api/v1/meals/ingredients/ingredientQuery - Get a list of meals by their ingredients
export async function getMealByIngredients(
  ingredientQuery: string,
): Promise<MealList> {
  const response = await request.get(
    `${serverURL}/meals/ingredients/${ingredientQuery}`,
  )
  return response.body
}

// Get /api/v1/meals/name - Get a list of meals by name

// Get /api/v1/meals/random - Get a random meal
// Maybe make a game out of this? Like a meal roulette or keep only one?

// GET /api/v1/meals/latest - Get the latest meals




