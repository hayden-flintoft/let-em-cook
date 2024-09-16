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
    <header className="mx-[10px] mt-[10px] w-[calc(100%-20px)] rounded-3xl bg-slate-50 p-4 text-[#9E3700]">
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
        <nav className="space-x-4">
          <Link
            to="/recipes-by-letter"
            className="scroll-m-20 text-3xl font-extrabold tracking-tight text-[#9E3700]"
          >
            All Recipes
          </Link>
        </nav>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mr-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recipes..."
            className="rounded-full border border-[#9E3700] px-4 py-2 text-[#9E3700]"
          />
          <button
            type="submit"
            className="ml-2 rounded-full bg-[#9E3700] px-4 py-2 text-white"
          >
            Search
          </button>
        </form>

        <div className="flex items-center space-x-4">
          {!user ? (
            <button
              onClick={handleSignIn}
              className="rounded-3xl border-2 border-[#9E3700] bg-white px-6 py-3 text-3xl font-extrabold text-[#9E3700] hover:bg-gray-100 focus:outline-none"
            >
              Sign In
            </button>
          ) : (
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-extrabold text-[#9E3700]">
                Hello, {user.firstName}
              </span>
              <button
                onClick={handleSignOut}
                className="rounded-3xl border-2 border-[#9E3700] bg-white px-6 py-3 text-3xl font-extrabold text-[#9E3700] hover:bg-gray-100 focus:outline-none"
              >
                Sign Out
              </button>
              <Link
                to="/userprofile"
                className="rounded-3xl border-2 border-[#9E3700] bg-white px-4 py-3"
              >
                <img
                  src="/images/chef.png"
                  alt="Chef Icon"
                  className="h-10 w-10 rounded-full object-cover"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
