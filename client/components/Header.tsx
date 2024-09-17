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
        {/* About us */}
        <Link
          to="/about"
          className="h-10 w-40 rounded-3xl bg-[#9E3700] text-center text-3xl font-extrabold text-white focus:outline-none"
        >
          <p>About</p>
        </Link>
        {/* Navigation Links */}
        {/* <span className="text-4xl font-extrabold text-[#9E3700]">
                Hello, {user?.firstName}
              </span> */}
        <Link
          to="/search"
          className="h-10 w-40 rounded-3xl bg-[#9E3700] text-center text-3xl font-extrabold text-white focus:outline-none"
        >
          <p>Browse</p>
        </Link>

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
            className="ml-2 h-10 w-20 rounded-full border border-[#9E3700] text-[#9E3700]"
          >
            Search
          </button>
        </form>

        <div className="flex items-center space-x-4">
          {!user ? (
            <button
              onClick={handleSignIn}
              className="h-10 w-40 rounded-3xl bg-[#9E3700] text-3xl font-extrabold text-white focus:outline-none"
            >
              Sign In
            </button>
          ) : (
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSignOut}
                className="h-10 w-40 rounded-3xl bg-[#9E3700] text-xl font-extrabold text-white focus:outline-none"
              >
                Sign Out
              </button>
              <Link
                to="/userprofile"
                className="h-10 w-10 rounded-3xl bg-[#9E3700]"
              >
                <img
                  src="images/chef (1).png"
                  alt="Chef Icon"
                  className="rounded-full object-cover"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
