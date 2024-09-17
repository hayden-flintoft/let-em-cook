import React from 'react'
import { useNavigate } from 'react-router-dom'

interface Recipe {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strCategory: string | null // Allow for the possibility of null
  strArea: string | null // Allow for the possibility of null
  strInstructions: string
  [key: string]: any
}

interface RecipeListItemProps {
  recipe: Recipe
  layout?: 'fullWidth' | 'card'
  maxIngredients?: number
}

const RecipeListItem: React.FC<RecipeListItemProps> = ({
  recipe,
  layout = 'card',
  maxIngredients = 5,
}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/recipe/${recipe.idMeal}`)
  }

  return (
    <div
      className="w-full cursor-pointer overflow-hidden rounded-3xl bg-white shadow-md transition-all hover:shadow-lg"
      onClick={handleClick}
    >
      <div className="relative">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="h-48 w-full object-cover"
        />
      </div>
      <div className="p-4">
        <h4 className="mb-1 truncate text-lg font-semibold">
          {recipe.strMeal}
        </h4>

        {/* Display Area (Cuisine) only if strArea is present */}
        {recipe.strArea && (
          <p className="mb-2 flex items-center text-sm text-gray-600">
            <img
              src={`/images/${recipe.strArea.toLowerCase()}.svg`}
              alt={recipe.strArea}
              className="mr-2 h-8 w-8"
            />
            {recipe.strArea}
          </p>
        )}

        <div className="flex items-center justify-between text-sm text-gray-600">
          {/* Display Category only if strCategory is present */}
          {recipe.strCategory && (
            <div className="flex items-center">
              <img
                src={`/images/${recipe.strCategory.toLowerCase()}.svg`}
                alt={recipe.strCategory}
                className="mr-2 h-8 w-8"
              />
              {recipe.strCategory}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RecipeListItem
