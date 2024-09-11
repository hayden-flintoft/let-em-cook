import request from 'superagent'
import { Ingredients } from '../../models/ingredients'

const serverURL = '/api/v1'

export async function getIngredients(): Promise<Ingredients> {
  const response = await request.get(`${serverURL}/ingredients`)
  return response.body
}
