import request from 'superagent'
import { Ingredient } from '../../models/ingredients'

const serverURL = '/api/v1'

export async function getIngredients(): Promise<Ingredient[]> {
  const response = await request.get(`${serverURL}/ingredients`)
  return response.body
}
