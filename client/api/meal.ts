import request from 'superagent'
import { Meal } from '../../models/meals'

const serverURL = '/api/v1'

// GET /api/v1/meals/id - Get a meal by its ID
export async function getMealById(mealId: string): Promise<Meal> {
  const response = await request.get(`${serverURL}/meals/${mealId}`)
  const mealResponse = response.body as { meals: Meal[] }
  // Corrected console.log statement
  console.log(`meal detail response: ${mealResponse.meals[0]}`)
  return mealResponse.meals[0]
}

// GET /api/v1/meals/ingredients/:ingredientQuery - Get a list of meals by their ingredients
export async function getMealByIngredients(
  ingredientQuery: string,
): Promise<Meal[]> {
  // Fetch the list of meals by ingredients
  const response = await request.get(
    `${serverURL}/meals/ingredients/${ingredientQuery}`,
  )

  const mealListResponse = response.body as { meals: Meal[] }
  const mealListItems = mealListResponse.meals

  if (!mealListItems) {
    return [] // No meals found
  }

  console.log(`meal list response: ${mealListItems}`)
  return mealListItems // Return detailed meals
}

// GET /api/v1/meals/latest - Get the latest meals
export async function getLatestMeals(): Promise<Meal[]> {
  const response = await request.get(`${serverURL}/meals/latest`)
  const mealListResponse = response.body as Meal[]

  if (!mealListResponse) {
    return [] // No meals found
  }

  console.log('latest meals response:', mealListResponse)
  return mealListResponse // Return detailed meals
}
