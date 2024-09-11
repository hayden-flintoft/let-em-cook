import request from 'superagent'
import { Areas } from '../../models/areas'

const serverURL = '/api/v1'

export async function getCategories(): Promise<Areas> {
  const response = await request.get(`${serverURL}/areas`)
  return response.body
}
