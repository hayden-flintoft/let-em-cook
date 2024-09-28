// client/components/Header.tsx
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser, useClerk } from '@clerk/clerk-react'
import { Search, User, Bookmark, Menu } from 'lucide-react'

const Header = () => {
  const { user } = useUser()
  const { signOut, openSignIn } = useClerk()
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

  const handleSearchClick = () => {
    // Navigate to the search page or open a search modal
    navigate('/search')
  }

  const handleBookmarkClick = () => {
    if (!user) {
      openSignIn()
    } else {
      // Navigate to the user's liked recipes page
      navigate('/liked-recipes')
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mobile Header */}
        <div className="flex h-16 items-center justify-between sm:hidden">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src="/images/Letemcook.png"
                alt="Logo"
                className="h-12 w-auto"
                style={{ maxWidth: '240px' }} // 2/3 of 360px
              />
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            {/* Bookmark Icon */}
            <button
              onClick={handleBookmarkClick}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <Bookmark
                className="h-6 w-6"
                fill={user ? '#000' : 'none'} // Fill if user is logged in
                stroke={user ? 'none' : 'currentColor'} // Remove stroke if filled
              />
            </button>

            {/* Search Icon */}
            <button
              onClick={handleSearchClick}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <Search className="h-6 w-6" />
            </button>

            {/* Hamburger Menu */}
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="sm:hidden">
            <nav className="space-y-1 px-2 pb-3 pt-2">
              <Link
                to="/about"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/search"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse
              </Link>
              {!user ? (
                <button
                  onClick={handleSignIn}
                  className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  Sign In
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSignOut}
                    className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                  <Link
                    to="/userprofile"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}

        {/* Desktop Header */}
        <div className="hidden h-20 items-center justify-between sm:flex">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/images/Letemcook.png" alt="Logo" className="h-16" />
            </Link>
          </div>

          {/* Navigation, Search bar, and Sign In/Out */}
          <div className="flex items-center space-x-6">
            {/* Navigation */}
            <nav className="flex space-x-6">
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
                className="w-64 rounded-full bg-gray-100 py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#9E3700]"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 transform"
              >
                <Search className="h-5 w-5 text-gray-400" />
              </button>
            </form>

            {/* Conditional Rendering of Sign In/Out and Profile */}
            {!user ? (
              <button
                onClick={handleSignIn}
                className="rounded-full bg-[#9E3700] px-6 py-2 text-lg font-semibold text-white hover:bg-[#7A2A00] focus:outline-none"
              >
                Sign In
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleSignOut}
                  className="rounded-full bg-[#9E3700] px-6 py-2 text-lg font-semibold text-white hover:bg-[#7A2A00] focus:outline-none"
                >
                  Sign Out
                </button>
                <Link
                  to="/userprofile"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#9E3700] text-xl font-bold text-white"
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
