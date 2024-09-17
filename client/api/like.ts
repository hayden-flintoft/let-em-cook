
import request from 'superagent'
import { LikeData } from 'models/likes'

const baseUrl = '/api/v1/likes/recipes'

export async function getLike(id: number) {
  const res = await request.get(`${baseUrl}/${id}`)
  return res.body
}

export async function addLike(newLike: LikeData) {
  return await request.post(`${baseUrl}`).send(newLike)
}
