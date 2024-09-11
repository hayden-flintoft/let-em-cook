import { useUser, useClerk } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

export default function Header() {
  const { user } = useUser()
  const { signOut, openSignIn } = useClerk()

  const handleSignIn = () => {
    openSignIn() // Opens the sign-in modal provided by Clerk
  }

  const handleSignOut = () => {
    signOut() // Signs the user out
  }

  return (
    <header className="mx-[10px] mt-[10px] w-[calc(100%-20px)] rounded-3xl bg-white p-4 text-[#9E3700]">
      <div className="container mx-auto flex h-full items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img
            src="/images/Letemcook.png"
            alt="Logo"
            className="h-full object-contain" // Ensure the logo fits within the header height
          />
        </Link>

        {/* Navigation Links */}
        <nav className="space-x-4">
          <Link
            to="/"
            className="scroll-m-20 text-3xl font-extrabold tracking-tight text-[#9E3700]"
          >
            Home
          </Link>
          <Link
            to="/meal"
            className="scroll-m-20 text-3xl font-extrabold tracking-tight text-[#9E3700]"
          >
            Meal
          </Link>
          <Link
            to="/recipe"
            className="scroll-m-20 text-3xl font-extrabold tracking-tight text-[#9E3700]"
          >
            Recipe
          </Link>
        </nav>

        {/* User Authentication Buttons */}
        <div className="flex items-center">
          {!user ? (
            <button
              onClick={handleSignIn}
              className="rounded-lg border-2 border-[#9E3700] bg-white px-4 py-2 text-[#9E3700]"
            >
              Sign In
            </button>
          ) : (
            <div className="flex items-center space-x-4">
              <span className="text-[#9E3700]">Hello, {user.firstName}</span>
              <button
                onClick={handleSignOut}
                className="rounded-lg border-2 border-[#9E3700] bg-white px-4 py-2 text-[#9E3700]"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
