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

describe.skip('db.getAllUsers()', () => {
  it('gets all the users', async () => {
    const users = await db.getAllUsers()
    expect(users).toHaveLength(2)
  })
})

describe.skip('db.getUserById()', () => {
  it('gets single user', async () => {
    const users = await db.getUserById(2)
    expect(users.username).toBe('joliver')
  })
})

describe.skip('db.getUserByUsername()', () => {
  it('gets single user', async () => {
    const users = await db.getUserByUsername('joliver')
    expect(users.id).toBe(2)
  })
})

describe.skip('db.getUserByEmail()', () => {
  it('gets single user', async () => {
    const users = await db.getUserByEmail('jo@email.com')
    expect(users.id).toBe(2)
  })
})

describe.skip('db.createUser()', () => {
  it('creates a single user', async () => {
    const users = await db
      .createUser({
        username: 'DavidDave',
        first_name: 'David',
        last_name: 'Davidson',
        email: 'dd@email.com',
        auth_token: '1234567890',
      })
      .then(() => db.getUserById(3))
    expect(users).toBeDefined()
  })
})

describe.skip('db.updateUser()', () => {
  it('updates a single user', async () => {
    const user = await db.updateUser(1, {
      first_name: 'Gorden',
    })

    console.log(user)
    expect(user.first_name).toEqual('Gorden')
  })
})

// TODO: Add test for deleteUser
describe.skip('db.deleteUser()', () => {
  it('deletes a single user', async () => {
    const user = await db.deleteUser(1)
  })
})
