export interface Users {
  users: User[]
}

export interface User {
  id?: number
  username: string
  firstName: string
  lastName: string
  email: string
  authToken: string
}
