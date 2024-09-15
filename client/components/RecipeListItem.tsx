import React from 'react'
import { useNavigate } from 'react-router-dom'

interface Recipe {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strCategory: string
  strArea: string
  strInstructions: string
  [key: string]: any // For dynamic keys like strIngredient1, strMeasure1, etc.
}

interface RecipeListItemProps {
  recipe: Recipe
  layout?: 'fullWidth' | 'card' // Optional prop to switch layouts
  maxIngredients?: number // Optional prop to limit ingredients displayed
}

const RecipeListItem: React.FC<RecipeListItemProps> = ({
  recipe,
  layout = 'card',
  maxIngredients = 5,
}) => {
  const navigate = useNavigate()

  // Extract ingredients and measures
  const ingredients: string[] = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`]
    const measure = recipe[`strMeasure${i}`]
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push(`${measure ? measure : ''} ${ingredient}`.trim())
    }
  }

  // Get the first n ingredients
  const displayedIngredients = ingredients.slice(0, maxIngredients).join(', ')
  const hasMoreIngredients = ingredients.length > maxIngredients

  // Shorten instructions
  const maxDescriptionLength = 100
  const isDescriptionTruncated =
    recipe.strInstructions.length > maxDescriptionLength
  const shortDescription = isDescriptionTruncated
    ? `${recipe.strInstructions.substring(0, maxDescriptionLength)}...`
    : recipe.strInstructions

  const handleClick = () => {
    navigate(`/recipe/${recipe.idMeal}`)
  }

  // Define polaroid style
  const polaroidStyle = {
    border: '15px solid #fff',
    borderBottomWidth: '35px', // Thicker bottom border
    borderRadius: '5px',
    overflow: 'hidden',
    backgroundColor: '#fff',
  }

  return (
    <div
      className={`cursor-pointer shadow ${layout === 'fullWidth' ? 'flex' : ''}`}
      onClick={handleClick}
      style={{ ...polaroidStyle, height: '400px' }} // Combine polaroid style and fixed height
    >
      <div className={`${layout === 'fullWidth' ? 'w-1/3' : 'h-1/2 w-full'}`}>
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="h-full w-full object-cover"
        />
      </div>
      <div
        className={`overflow-hidden p-4 ${
          layout === 'fullWidth' ? 'w-2/3' : ''
        }`}
      >
        <h4 className="truncate text-xl font-semibold">{recipe.strMeal}</h4>
        <p className="text-sm text-gray-600">
          {recipe.strCategory} - {recipe.strArea}
        </p>
        <p className="mt-2 text-sm text-gray-800">
          <strong>Ingredients:</strong>{' '}
          <span className="line-clamp-2">
            {displayedIngredients}
            {hasMoreIngredients && '...'}
          </span>
        </p>
        <p className="mt-2 line-clamp-3 text-sm text-gray-800">
          {shortDescription}
        </p>
        {isDescriptionTruncated && (
          <p className="mt-2 text-center">
            <span className="text-blue-500">Read more</span>
          </p>
        )}
      </div>
    </div>
  )
}

export default RecipeListItem
