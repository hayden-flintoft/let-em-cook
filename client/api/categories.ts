import request from 'superagent'
import { Categories } from '../../models/categories'

const serverURL = '/api/v1'

export async function getCategories(): Promise<Categories> {
  const response = await request.get(`${serverURL}/categories`)
  return response.body
}
