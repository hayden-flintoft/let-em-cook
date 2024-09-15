import request from 'superagent'

export async function getHeart() {
  const res = await request.get()
}


export async function addHeart() {
  const res = await request.post()
}