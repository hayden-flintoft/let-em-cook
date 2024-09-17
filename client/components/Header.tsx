import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser, useClerk } from '@clerk/clerk-react'
import { Search, User } from 'lucide-react'

const Header = () => {
  const { user } = useUser()
  const { signOut, openSignIn } = useClerk()
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSignIn = () => {
    openSignIn()
  }

  const handleSignOut = () => {
    signOut()
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`)
    }
  }

  return (
    <header>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-17 flex items-center justify-between pt-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/images/Letemcook.png" alt="Logo" className="h-16" />
            </Link>
          </div>

          {/* Navigation, Search bar, and Sign In/Out */}
          <div className="flex items-center space-x-6">
            {/* Navigation */}
            <nav className="flex space-x-6 pt-6">
              <Link
                to="/about"
                className="text-lg font-semibold text-[#9E3700] hover:text-[#7A2A00]"
              >
                About
              </Link>
              <Link
                to="/search"
                className="text-lg font-semibold text-[#9E3700] hover:text-[#7A2A00]"
              >
                Browse
              </Link>
            </nav>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recipes..."
                className="mt-5 w-64 rounded-full bg-gray-100 py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#9E3700]"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 transform"
              >
                <Search className="mt-4 h-5 w-5 text-gray-400" />
              </button>
            </form>

            {/* Conditional Rendering of Sign In/Out */}
            {!user ? (
              <button
                onClick={handleSignIn}
                className="rounded-full bg-[#9E3700] px-6 py-2 text-lg font-semibold text-white hover:bg-[#7A2A00] focus:outline-none"
              >
                Sign In
              </button>
            ) : (
              <div className="flex items-center space-x-4 pt-1">
                <button
                  onClick={handleSignOut}
                  className="mt-4 rounded-full bg-[#9E3700] px-6 py-2 text-lg font-semibold text-white hover:bg-[#7A2A00] focus:outline-none"
                >
                  Sign Out
                </button>
                <Link
                  to="/userprofile"
                  className="mt-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#9E3700] text-xl font-bold text-white"
                >
                  {user.firstName?.[0] || <User className="h-6 w-6" />}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
