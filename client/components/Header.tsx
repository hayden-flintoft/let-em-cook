// client/components/Header.tsx
import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser, useClerk } from '@clerk/clerk-react'
import { Search, User, Bookmark, Menu } from 'lucide-react'

const Header = () => {
  const { user } = useUser()
  const { signOut, openSignIn } = useClerk()
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchInputRef = useRef(null)

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
    setIsSearchOpen(false)
  }

  const handleBookmarkClick = () => {
    if (!user) {
      openSignIn()
    } else {
      navigate('/liked-recipes')
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target) &&
        !event.target.closest('.search-icon')
      ) {
        setIsSearchOpen(false)
      }
    }

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      // Focus on the input when it appears
      if (searchInputRef.current) {
        searchInputRef.current.focus()
      }
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isSearchOpen])

  return (
    <header className="relative z-50 h-[60px] bg-white shadow-md lg:h-[115px] lg:py-5">
      <div className="relative mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img
              src="/images/Letemcook.png"
              alt="Logo"
              className="max-h-[60px] w-[120px] object-contain sm:w-[150px] md:w-[200px] lg:max-h-[115px] lg:w-[250px] xl:w-[300px] 2xl:w-[350px]"
            />
          </Link>
        </div>

        {/* Mobile Icons and Search Input */}
        <div className="flex items-center space-x-2 md:hidden">
          {/* Bookmark Icon - only show when search is not open */}
          {!isSearchOpen && (
            <button
              onClick={handleBookmarkClick}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <Bookmark
                className="h-6 w-6"
                fill={user ? '#000' : 'none'}
                stroke={user ? 'none' : 'currentColor'}
              />
            </button>
          )}

          {/* Search Input - only show when search is open */}
          {isSearchOpen && (
            <form onSubmit={handleSearch} className="relative mr-2">
              <input
                type="text"
                ref={searchInputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-40 rounded-full bg-gray-100 py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#9E3700]"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 transform"
              >
                <Search className="h-5 w-5 text-gray-400" />
              </button>
            </form>
          )}

          {/* Search Icon */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="search-icon text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <Search className="h-6 w-6" />
          </button>

          {/* Hamburger Menu and Dropdown */}
          <div className="relative">
            {/* Hamburger Menu */}
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-48 bg-white shadow-md">
                <nav className="space-y-1 px-4 pb-3 pt-2">
                  {/* Menu items */}
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
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-6 md:flex">
          {/* Navigation Links */}
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
              className="w-40 rounded-full bg-gray-100 py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#9E3700] sm:w-48 md:w-56 lg:w-64"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 transform"
            >
              <Search className="h-5 w-5 text-gray-400" />
            </button>
          </form>

          {/* Sign In/Out and Profile */}
          {!user ? (
            <button
              onClick={handleSignIn}
              className="rounded-full bg-[#9E3700] px-4 py-2 text-lg font-semibold text-white hover:bg-[#7A2A00] focus:outline-none"
            >
              Sign In
            </button>
          ) : (
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSignOut}
                className="rounded-full bg-[#9E3700] px-4 py-2 text-lg font-semibold text-white hover:bg-[#7A2A00] focus:outline-none"
              >
                Sign Out
              </button>
              <Link
                to="/userprofile"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#9E3700] text-xl font-bold text-white"
              >
                {user.firstName?.[0] || <User className="h-6 w-6" />}
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
