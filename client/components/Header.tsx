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
    <header className="w-full bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/">
          <img src="/images/Letemcook.png" alt="Logo" className="w-16" />
        </Link>

        <nav className="space-x-4">
          <Link to="/" className="hover:text-yellow-300">
            Home
          </Link>
          <Link to="/meal" className="hover:text-yellow-300">
            Meal
          </Link>
          <Link to="/about" className="hover:text-yellow-300">
            About
          </Link>
          <Link to="/contact" className="hover:text-yellow-300">
            Contact
          </Link>
        </nav>

        <div className="flex items-center">
          {!user ? (
            <button
              onClick={handleSignIn}
              className="rounded-lg bg-[#9E3700] px-4 py-2 text-white"
            >
              Sign In
            </button>
          ) : (
            <div className="flex items-center space-x-4">
              <span>Hello, {user.firstName}</span>
              <button
                onClick={handleSignOut}
                className="rounded-lg bg-[#9E3700] px-4 py-2 text-white"
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
