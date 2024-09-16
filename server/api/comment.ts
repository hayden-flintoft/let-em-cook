import express from 'express'
import * as db from '../db/functions/users'

const router = express.Router()

// Get '/api/v1/comments/recipes/:id

router.get('/recipes/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const comment = await db.getCommentByRecipeId(id)
    res.json(comment)
  } catch {
    res.sendStatus(500)
  }
})

router.post('/recipes/', async (req, res) => {
  const addComment = req.body
  try {
    const comment = await db.addCommentByRecipeId(addComment)
    res.json(comment)
  } catch {
    res.sendStatus(500)
  }
})
export default router
