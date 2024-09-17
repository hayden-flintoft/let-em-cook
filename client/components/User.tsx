import { useState, useEffect } from 'react';
import { useClerk, useUser } from '@clerk/clerk-react';
import { Heart } from 'lucide-react';
import { fetchRecipeById } from '@/api/recipes';
import { Meal } from 'models/meals';


export default function User() {
  const { user } = useUser();
  const { openUserProfile } = useClerk();
  const [likedRecipes, setLikedRecipes] = useState([] as Meal[]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  useEffect(() => {
    fetchLikedRecipes();
  }, [user]);

  const fetchLikedRecipes = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/v1/likes/user/${user.id}`);
      const data = await response.json();
      const promises: Meal[] = data.map( async (recipe) => {
      const response = await fetchRecipeById(recipe.recipeId)
      return response
      } ) 
      const fullrecipes = await Promise.all(promises)
      console.log(fullrecipes)
      setLikedRecipes(fullrecipes);
    } catch (error) {
      console.error('Error fetching liked recipes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenUserProfile = () => {
    openUserProfile();
  };

  const handleRecipeClick = (recipeId) => {
    setSelectedRecipeId(recipeId);
  };

  

  return (
    <>
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

      <div className="border-b border-white w-full relative z-10"></div>

      <div className="p-6 z-10 relative">
        {isLoading ? (
          <p className="text-white">Loading liked recipes...</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {likedRecipes.map((recipe) => (
              <div 
                key={recipe.idMeal} 
                className="bg-white p-4 rounded-3xl shadow-md cursor-pointer"
                onClick={() => handleRecipeClick(recipe.idMeal)}
              >
                <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-40 object-cover rounded-3xl" />
                <h3 className="text-xl font-semibold mt-2 text-[#9E3700]">{recipe.strMeal}</h3>
              </div>
            ))}
          </div>
        )}

        {!isLoading && likedRecipes.length === 0 && (
          <p className="text-white">You havent liked any recipes yet.</p>
        )}
      </div>

      {selectedRecipeId && (
        <div className="p-6 bg-white rounded-3xl mt-6">
          <h2 className="text-2xl font-bold mb-4">Selected Recipe</h2>
          {isRecipeLoading ? (
            <p>Loading recipe...</p>
          ) : selectedRecipe ? (
            <div>
              <h3 className="text-xl font-semibold">{selectedRecipe.name}</h3>
              <img src={selectedRecipe.image} alt={selectedRecipe.name} className="w-full h-60 object-cover rounded-lg my-4" />
              <p>{selectedRecipe.description}</p>

              <ol className="list-decimal pl-5">
                {selectedRecipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
          ) : (
            <p>Recipe not found</p>
          )}
        </div>
      )}
    </div>
    </> );
}