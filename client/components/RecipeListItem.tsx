import React from 'react'
import { useNavigate } from 'react-router-dom'

interface Recipe {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strCategory: string
  strArea: string
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
      className="w-full cursor-pointer overflow-hidden rounded-3xl bg-white shadow-md transition-all hover:shadow-lg" // Set full width to ensure consistency
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
        <p className="mb-2 text-sm text-gray-600">{recipe.strArea}</p>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
              />
            </svg>
            {recipe.strCategory}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeListItem
