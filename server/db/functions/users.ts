import connection from '../connection'
import { User } from '../../../models/users'

const db = connection

// Get all users
export function getAllUsers(): Promise<User[]> {
  return db('users').select(
    'id',
    'username',
    'first_name as firstName',
    'last_name as lastName',
    'email',
    'auth_token as authToken',
  )
}

// get each user id
export function getUserById(id: number): Promise<User> {
  return db('users')
    .select(
      'id',
      'username',
      'first_name as firstName',
      'last_name as lastName',
      'email',
      'auth_token as authToken',
    )
    .where({ id })
    .first()
}

// get each user by username
export function getUserByUsername(username: string): Promise<User> {
  return db('users')
    .select(
      'id',
      'username',
      'first_name as firstName',
      'last_name as lastName',
      'email',
      'auth_token as authToken',
    )
    .where({ username })
    .first()
}

// get each user by email
export function getUserByEmail(email: string): Promise<User> {
  return db('users')
    .select(
      'id',
      'username',
      'first_name as firstName',
      'last_name as lastName',
      'email',
      'auth_token as authToken',
    )
    .where({ email })
    .first()
}

// create a user
export function createUser(user: User): Promise<number[]> {
  return db('users').insert(user).returning('id') // Check case swapping is performed.
}

// update a user
export function updateUser(
  id: number,
  updates: {
    username?: string
    firstName?: string
    lastName?: string
    email?: string
    authToken?: string
  },
) {
  return db('users').where({ id }).update(updates)
}

// delete a user
export function deleteUser(id: number) {
  return db('users').where({ id }).del()
}
