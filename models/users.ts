export interface Users {
  users: User[]
}

export interface User {
  id?: number
  username: string
  first_name: string
  last_name: string
  email: string
  auth_token: string
}
