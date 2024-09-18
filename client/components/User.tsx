
import { useState, useEffect } from 'react';
import { useClerk, useUser } from '@clerk/clerk-react';
import { Heart } from 'lucide-react';
import { fetchRecipeById } from '@/api/recipes';
import { Meal } from 'models/meals';
import { UserButton } from '@clerk/clerk-react';

export default function User() {
  const { user } = useUser()
  const { openUserProfile } = useClerk()
  const [likedRecipes, setLikedRecipes] = useState([] as Meal[])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedRecipeId, setSelectedRecipeId] = useState(null)

  useEffect(() => {
    fetchLikedRecipes()
  }, [user])

  const fetchLikedRecipes = async () => {
    if (!user) return
    setIsLoading(true)
    try {
      const response = await fetch(`/api/v1/likes/user/${user.id}`)
      const data = await response.json()
      const promises: Meal[] = data.map(async (recipe) => {
        const response = await fetchRecipeById(recipe.recipeId)
        return response
      })
      const fullrecipes = await Promise.all(promises)
      console.log(fullrecipes)
      setLikedRecipes(fullrecipes)
    } catch (error) {
      console.error('Error fetching liked recipes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenUserProfile = () => {
    openUserProfile()
  }

  const handleRecipeClick = (recipeId) => {
    setSelectedRecipeId(recipeId)
  }

  return (
    
    <div className="max-w-4xl mx-auto bg-[#9E3700] shadow-lg rounded-3xl overflow-hidden">
      <div className="p-8">
        <h1 className="mb-8 text-4xl font-bold text-white">Profile</h1>
        <div className="mb-8 flex items-center">
      <div className="h-50 w-50">
        <UserButton 
          appearance={{
            elements: {
              userButtonAvatarBox: "h-full w-full",
            },
          }}
        />
    </div>
          <div>
            <h2 className="text-3xl font-semibold text-white mb-1">
              {user?.firstName}
            </h2>
            <p className="text-orange-200 mb-3">{user?.username}</p>
            <button
              onClick={handleOpenUserProfile}
              className="rounded-full bg-white px-6 py-2 text-[#9E3700] transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
            >
              Settings
            </button>
          </div>
        </div>
        <br></br>
        <div className="flex justify-center items-center">
          <div className="flex items-center bg-white rounded-full px-8 py-4">
            <Heart className="mr-2 h-6 w-6 text-[#9E3700]" />
            <span className="text-md font-bold text-[#9E3700]">Liked recipes</span>
          </div>
        </div>
      </div>

      <div className="bg-[#9E3700] p-8">
        {isLoading ? (
          <p className="text-white">Loading liked recipes...</p>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {likedRecipes.map((recipe) => (
              <div 
                key={recipe.idMeal} 
                className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
                onClick={() => handleRecipeClick(recipe.idMeal)}
              >
                <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover" />
                <h3 className="text-xl font-semibold p-4 text-orange-900">{recipe.strMeal}</h3>
              </div>
            ))}
          </div>
        )}

        {!isLoading && likedRecipes.length === 0 && (
          <p className="text-white text-center py-8">You haven't liked any recipes yet.</p>
        )}
      </div>

      {selectedRecipeId && (
        <div className="p-8 bg-white">
          <h2 className="text-3xl font-bold mb-6 text-[#9E3700]">Selected Recipe</h2>
          {isRecipeLoading ? (
            <p className="text-orange-900">Loading recipe...</p>
          ) : selectedRecipe ? (
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-orange-800">{selectedRecipe.name}</h3>
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.name}
                className="w-full h-72 object-cover rounded-xl mb-6"
              />
              <p className="text-gray-700 mb-6">{selectedRecipe.description}</p>

              <h4 className="text-xl font-semibold mb-4 text-orange-800">Instructions</h4>
              <ol className="list-decimal pl-6 space-y-2">
                {selectedRecipe.instructions.map((instruction, index) => (
                  <li key={index} className="text-gray-700">{instruction}</li>
                ))}
              </ol>
            </div>
          ) : (
            <p className="text-orange-900">Recipe not found</p>
          )}
        </div>
      )}
    </div>
  );
}