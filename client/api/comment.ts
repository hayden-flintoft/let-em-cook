import { CommentData } from 'models/comments'
import request from 'superagent'

const baseUrl = '/api/v1/comments/recipe'

export async function getComment(id: number) {
  const res = await request.get(`${baseUrl}/${id}`)
  return res.body
}

export async function addComment(newComment: CommentData) {
  return await request.post(`${baseUrl}`).send(newComment)
}
