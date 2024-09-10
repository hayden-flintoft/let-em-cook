import express from 'express'
import * as db from '../db/functions/users'

const router = express.Router()

// Get '/api/vi/users'
router.get('/user/', async (req, res) => {
  try {
    const users = await db.getAllUsers()
    res.json(users)
  } catch (error) {
    res.sendStatus(500)
  }
})

// Get '/api/vi/users/:id'
router.get('/user/:id', async (req, res) => {
  const username = Number(req.params.id)
  try {
    const user = await db.getUserById(username)
    res.json(user)
  } catch {
    // console.error(`Database error: ${error}`)
    res.sendStatus(500)
  }
})

// Get '/api/vi/users/:username'
router.get('/user/:username', async (req, res) => {
  const username = Number(req.params.username)
  try {
    const user = await db.getUserById(username)
    res.json(user)
  } catch {
    // console.error(`Database error: ${error}`)
    res.sendStatus(500)
  }
})

// Get '/api/vi/users/:email'
router.get('/user/:email', async (req, res) => {
  const email = String(req.params.email)
  try {
    const user = await db.getUserByEmail(email)
    res.json(user)
  } catch {
    // console.error(`Database error: ${error}`)
    res.sendStatus(500)
  }
})

// Post '/api/vi/users'
router.post('/user/', async (req, res) => {
  const { username, firstName, lastName, email, authToken } = req.body
  try {
    const user = await db.createUser({
      username,
      firstName,
      lastName,
      email,
      authToken,
    })
    res.json(user)
  } catch (error) {
    console.error(`Database error: ${error}`)
    res.sendStatus(500)
  }
})

// Patch '/api/vi/users/:id'
router.patch('/user/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { username, firstName, lastName, email, authToken } = req.body
  try {
    const user = await db.updateUser(id, {
      username,
      firstName,
      lastName,
      email,
      authToken,
    })
    res.json(user)
  } catch (error) {
    console.error(`Database error: ${error}`)
    res.sendStatus(500)
  }
})

// Delete 'api/v1/users/:id
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    await db.deleteUser(id)
    res.sendStatus(204)
  } catch (error) {
    console.error(`Database error: ${error}`)
    res.sendStatus(500)
  }
})

export default router
