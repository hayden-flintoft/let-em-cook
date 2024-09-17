import { useState, useEffect } from 'react';
import { useClerk, useUser } from '@clerk/clerk-react';
import { Heart } from 'lucide-react';

export default function User() {
  const { user } = useUser();
  const { openUserProfile } = useClerk();
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLikedRecipes();
  }, [user]);

  const fetchLikedRecipes = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/v1/likes/user/${user.id}`);
      const data = await response.json();
      setLikedRecipes(data);
    } catch (error) {
      console.error('Error fetching liked recipes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenUserProfile = () => {
    openUserProfile();
  };

  return (
    <div className="relative max-w-4xl mx-auto bg-[#9E3700] shadow-lg rounded-3xl overflow-hidden">
      <div className="p-6">
        <h1 className="text-4xl font-bold text-white mb-6">Profile</h1>
        <div className="flex items-center mb-6">
          <div className="w-24 h-24 bg-[#9E3700] rounded-3xl flex items-center border-5 border-white justify-center text-white text-4xl font-bold mr-4">
            <img src="images/Untitled design (1).png" alt="Chef Icon" />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-white">{user?.firstName}</h2>
            <p className="text-white">{user?.username}</p>
            <button
              onClick={handleOpenUserProfile}
              className="mt-2 px-4 py-2 border border-white text-white rounded-full hover:bg-green-600 hover:text-white transition-colors"
            >
              Settings
            </button>
          </div>
        </div>
        <div className="flex mb-4">
          <button className="text-white">
            <span className="flex items-center">
              <Heart className="w-6 h-6 mr-2" />
              Likes
            </span>
          </button>
        </div>
      </div>

      {/* Horizontal line */}
      <div className="border-b border-white w-full relative z-10"></div>

      {/* Liked recipes */}
      <div className="p-6 z-10 relative">
        {isLoading ? (
          <p className="text-white">Loading liked recipes...</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {likedRecipes.map((recipe) => (
              <div key={recipe.recipeId} className="bg-white p-4 rounded-lg shadow-md">
                <img src={recipe.image} alt={recipe.name} className="w-full h-40 object-cover rounded-lg" />
                <h3 className="text-xl font-semibold mt-2">{recipe.name}</h3>
                <p className="text-gray-600">{recipe.description}</p>
                {/* You can add more details like ingredients, cooking time, etc. */}
              </div>
            ))}
          </div>
        )}

        {!isLoading && likedRecipes.length === 0 && (
          <p className="text-white">You haven't liked any recipes yet.</p>
        )}
      </div>
    </div>
  );
}
