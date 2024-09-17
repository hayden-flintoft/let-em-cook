import { useUser, useClerk } from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Header() {
  const { user } = useUser()
  const { signOut, openSignIn } = useClerk()
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSignIn = () => {
    openSignIn() // Opens the sign-in modal provided by Clerk
  }

  const handleSignOut = () => {
    signOut() // Signs the user out
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`) // Redirect to /search with the query
    }
  }

  return (
    <header className="mx-4 mt-4 w-[calc(100%-8px)] rounded-3xl bg-background p-4 text-primary">
      <div className="container mx-auto flex h-full items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img
            src="/images/Letemcook.png"
            alt="Logo"
            className="h-full object-contain"
          />
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          <Link
            to="/about"
            className="h-10 w-32 rounded-3xl bg-primary text-center text-lg font-extrabold text-white focus:outline-none"
          >
            <p>About</p>
          </Link>
          <Link
            to="/search"
            className="h-10 w-32 rounded-3xl bg-primary text-center text-lg font-extrabold text-white focus:outline-none"
          >
            <p>Browse</p>
          </Link>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recipes..."
            className="w-full rounded-full border border-primary px-4 py-2 text-primary"
          />
          <button
            type="submit"
            className="h-10 w-20 rounded-full bg-primary text-white focus:outline-none"
          >
            Search
          </button>
        </form>

        <div className="flex items-center space-x-4">
          {!user ? (
            <button
              onClick={handleSignIn}
              className="h-10 w-32 rounded-3xl bg-primary text-lg font-extrabold text-white focus:outline-none"
            >
              Sign In
            </button>
          ) : (
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSignOut}
                className="h-10 w-32 rounded-3xl bg-primary text-lg font-extrabold text-white focus:outline-none"
              >
                Sign Out
              </button>
              <Link
                to="/userprofile"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white"
              >
                <img
                  src="/images/chef (1).png"
                  alt="Chef Icon"
                  className="h-8 w-8 rounded-full object-cover"
                />
                {/* Display user first initial if available */}
                {user?.firstName?.[0]}
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
