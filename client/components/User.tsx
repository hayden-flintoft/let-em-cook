import { useClerk, useUser } from '@clerk/clerk-react';
import { Heart } from 'lucide-react';

export default function User(){
  const {user} = useUser()
  const { openUserProfile } = useClerk()
  const handleOpenUserProfile = () => {
    openUserProfile() // Opens Clerk's user profile modal
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-3xl overflow-hidden">
      <div className="p-6">
        <h1 className="text-4xl font-bold mb-6">Profile</h1>
        <div className="flex items-center mb-6">
          <div className="w-24 h-24 bg-[#9E3700] rounded-3xl flex items-center justify-center text-white text-4xl font-bold mr-4">
            {user?.firstName[0]}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user?.firstName}</h2>
            <p className="text-gray-600">{user?.username}</p>
            <button onClick={handleOpenUserProfile} className="mt-2 px-4 py-2 border border-green-600 text-green-600 rounded-full hover:bg-green-600 hover:text-white transition-colors">
              Settings
            </button>
          </div>
        </div>
        <div className="flex border-b pb-4 mb-4">
          <button className="mr-8 text-gray-600 hover:text-gray-900">
          </button>
          <button className="mr-8 text-gray-600 hover:text-gray-900">
            <span className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              Recipes
            </span>
          </button>
          <button className="text-orange-600 border-b-2 border-orange-600">
            <span className="flex items-center">
              <Heart className="w-6 h-6 mr-2" />
              Likes
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};