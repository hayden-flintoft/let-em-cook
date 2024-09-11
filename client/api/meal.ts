import request from 'superagent'
import { Meal, MealList } from '../../models/meals'

const serverURL = '/api/v1'

export async function getMealById(mealId: string): Promise<Meal> {
  const response = await request.get(`${serverURL}/meals/${mealId}`)
  return response.body
}

export async function getMealByIngredients(
  ingredientQuery: string,
): Promise<MealList> {
  const response = await request.get(
    `${serverURL}/meals/ingredients/${ingredientQuery}`,
  )
  return response.body
}
