import request from 'superagent'
import { Meal } from '../../models/meals'

const serverURL = '/api/v1'

export async function getMealById(mealId: string): Promise<Meal> {
  const response = await request.get(`${serverURL}/meals/${mealId}`)
  return response.body
}
