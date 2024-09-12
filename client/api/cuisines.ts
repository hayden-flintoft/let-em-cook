import request from 'superagent'
import { Cuisine } from '../../models/cuisines'

const serverURL = '/api/v1'

export async function getCuisines(): Promise<Cuisine> {
  const response = await request.get(`${serverURL}/areas`)
  return response.body
}
