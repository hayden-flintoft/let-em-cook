import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, User, Home } from 'lucide-react';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Home className="h-6 w-6 text-purple-600" />
                <span className="text-purple-600 font-semibold">Home</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-gray-100 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <Search className="h-5 w-5 text-gray-400" />
              </button>
            </form>
            <Link to="/favorites" className="ml-4">
              <Heart className="h-6 w-6 text-gray-400 hover:text-purple-600" />
            </Link>
            <Link to="/profile" className="ml-4">
              <User className="h-6 w-6 text-gray-400 hover:text-purple-600" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;