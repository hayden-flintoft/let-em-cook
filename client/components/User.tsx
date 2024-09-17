
import { useState, useEffect } from 'react';
import { useClerk, useUser } from '@clerk/clerk-react';
import { Heart } from 'lucide-react';
import { fetchRecipeById } from '@/api/recipes';
import { Meal } from 'models/meals';
import { AuroraBackground } from './ui/aurora-background';


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
    <>
    <div className="relative max-w-4xl mx-auto bg-[#9E3700] shadow-lg rounded-3xl overflow-hidden">
      <div className="p-6">
        <h1 className="mb-6 text-4xl font-bold text-white">Profile</h1>
        <div className="mb-6 flex items-center">
          <div className="border-5 mr-4 flex h-24 w-24 items-center justify-center rounded-3xl border-white bg-[#9E3700] text-4xl font-bold text-white">
            <img src="/images/Untitled design (1).png" alt="Chef Icon" />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-white">
              {user?.firstName}
            </h2>
            <p className="text-white">{user?.username}</p>
            <button
              onClick={handleOpenUserProfile}
              className="mt-2 rounded-full border border-white px-4 py-2 text-white transition-colors hover:bg-green-600 hover:text-white"
            >
              Settings
            </button>
          </div>
        </div>
        <div className="mb-4 flex">
          <button className="text-white">
            <span className="flex items-center">
              <Heart className="mr-2 h-6 w-6" />
              Likes
            </span>
          </button>
        </div>
      </div>

      <div className="relative z-10 w-full border-b border-white"></div>

      <div className="relative z-10 p-6">
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
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.name}
                className="my-4 h-60 w-full rounded-lg object-cover"
              />
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
