import express from 'express'
import * as db from '../db/functions/users'


const router = express.Router()


router.get('/recipes/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const like = await db.getLikesById(id)
    res.json(like[0])
  } catch (error) {
    console.error(error.message)
    res.sendStatus(500)
  }
})

router.post('/recipes/:id', async (req, res) => {
  const addLike = req.body 
  try {
    await db.addLikes(addLike)
    const count = await db.countLikes(Number(req.params.id))
    res.json(count[0])
  } catch (error) {
    console.error(error.message)
    res.sendStatus(500)
  }
})
export default router

router.get('/user/:id', async (req, res) => {
  const clerkId = req.params.id
  try {
    const result = await db.getLikeByClerkId(clerkId)
    res.json(result)
  } catch (error) {
    console.error(error.message)
    res.sendStatus(500)
  }
})

