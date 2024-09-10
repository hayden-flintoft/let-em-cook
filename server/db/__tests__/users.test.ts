import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import connection from '../connection.ts'
import * as db from '../functions/users.ts'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})

describe('db.getAllUsers()', () => {
  it('gets all the users', async () => {
    const users = await db.getAllUsers()
    expect(users).toHaveLength(2)
  })
})

describe('db.getUserById()', () => {
  it('gets single user', async () => {
    const users = await db.getUserById(2)
    expect(users.username).toBe('joliver')
  })
})

describe('db.getUserByUsername()', () => {
  it('gets single user', async () => {
    const users = await db.getUserByUsername('joliver')
    expect(users.id).toBe(2)
  })
})

describe('db.getUserByEmail()', () => {
  it('gets single user', async () => {
    const users = await db.getUserByEmail('jo@email.com')
    expect(users.id).toBe(2)
  })
})

describe('db.createUser()', () => {
  it('creates a single user', async () => {
    const users = await db
      .createUser({
        username: 'DavidDave',
        firstName: 'David',
        lastName: 'Davidson',
        email: 'dd@email.com',
        authToken: '1234567890',
      })
      .then(() => db.getUserById(3))
    expect(users).toHaveLength(1)
  })
})

// TODO: Fix the createUser test
// TODO: Add test for updateUser
// TODO: Add test for deleteUser
