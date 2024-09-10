import {
  SignIn,
  SignInButton,
  SignOutButton,
  UserProfile,
  UserButton,
} from '@clerk/clerk-react'

export default function Login() {
  return (
    <>
      <div>
        <SignOutButton></SignOutButton>
        <UserProfile></UserProfile>
      </div>
    </>
  )
}
