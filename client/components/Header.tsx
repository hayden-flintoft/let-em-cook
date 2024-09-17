import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/clerk-react';
import { Search, User } from 'lucide-react';

const Header = () => {
  const { user } = useUser();
  const { signOut, openSignIn } = useClerk();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSignIn = () => {
    openSignIn();
  };

  const handleSignOut = () => {
    signOut();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center">
              <img src="/images/Letemcook.png" alt="Logo" className="h-16 w-auto" />
            </Link>
            <Link to="/about" className="text-[#9E3700] text-lg font-semibold hover:text-[#7A2A00]">
              About
            </Link>
            <Link to="/search" className="text-[#9E3700] text-lg font-semibold hover:text-[#7A2A00]">
              Browse
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recipes..."
                className="w-64 bg-gray-100 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#9E3700]"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="h-5 w-5 text-gray-400" />
              </button>
            </form>

            {!user ? (
              <button
                onClick={handleSignIn}
                className="bg-[#9E3700] text-white text-lg font-semibold py-2 px-6 rounded-full hover:bg-[#7A2A00] focus:outline-none"
              >
                Sign In
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleSignOut}
                  className="bg-[#9E3700] text-white text-lg font-semibold py-2 px-6 rounded-full hover:bg-[#7A2A00] focus:outline-none"
                >
                  Sign Out
                </button>
                <Link
                  to="/userprofile"
                  className="rounded-full bg-[#9E3700] w-12 h-12 flex items-center justify-center text-white text-xl font-bold"
                >
                  {user.firstName?.[0] || <User className="h-6 w-6" />}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;