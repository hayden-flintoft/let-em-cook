import express from 'express'
import * as db from '../db/functions/users'

const router = express.Router()

router.get('/recipes/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const comment = await db.getCommentByRecipeId(id)
    res.json(comment)
  } catch {
    res.sendStatus(500)
  }
})

router.post('/recipes', async (req, res) => {
  const addComment = req.body
  try {
    await db.addCommentByRecipeId(addComment)
    res.sendStatus(202)
  } catch (error) {
    console.error(error.message)
    res.sendStatus(500)
  }
})
export default router
