import request from 'superagent'

export async function getComment() {
  const res = await request.get()
}


export async function addComment() {
  const res = await request.post()
}