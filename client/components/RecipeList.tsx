import React from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'

interface Recipe {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strCategory: string
  strArea: string
}

interface OutletContextType {
  recipes: Recipe[]
  selectedCategories: string[]
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>
  selectedCuisines: string[]
  setSelectedCuisines: React.Dispatch<React.SetStateAction<string[]>>
}

const RecipeList: React.FC = () => {
  const navigate = useNavigate()
  const {
    recipes,
    selectedCategories,
    setSelectedCategories,
    selectedCuisines,
    setSelectedCuisines,
  } = useOutletContext<OutletContextType>()

  const categories = ['Vegetarian', 'Vegan', 'Dessert', 'Breakfast']
  const cuisines = ['Italian', 'Chinese', 'Mexican', 'Indian']

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category],
    )
  }

  const handleCuisineChange = (cuisine: string) => {
    setSelectedCuisines((prev) =>
      prev.includes(cuisine)
        ? prev.filter((item) => item !== cuisine)
        : [...prev, cuisine],
    )
  }

  return (
    <div>
      {/* Category Selection */}
      <div>
        <h3 className="mb-2 text-xl font-bold text-white">Select Category</h3>
        {categories.map((category) => (
          <div key={category}>
            <input
              type="checkbox"
              id={`category-${category}`}
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            <label htmlFor={`category-${category}`} className="ml-2 text-white">
              {category}
            </label>
          </div>
        ))}
      </div>

      {/* Cuisine Selection */}
      <div>
        <h3 className="mb-2 text-xl font-bold text-white">Select Cuisine</h3>
        {cuisines.map((cuisine) => (
          <div key={cuisine}>
            <input
              type="checkbox"
              id={`cuisine-${cuisine}`}
              checked={selectedCuisines.includes(cuisine)}
              onChange={() => handleCuisineChange(cuisine)}
            />
            <label htmlFor={`cuisine-${cuisine}`} className="ml-2 text-white">
              {cuisine}
            </label>
          </div>
        ))}
      </div>

      {/* Recipe List */}
      <div>
        {recipes.length > 0 ? (
          <div>
            <h3 className="mb-4 text-2xl font-bold text-white">
              Recipes Found:
            </h3>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recipes.map((recipe) => (
                <li
                  key={recipe.idMeal}
                  className="cursor-pointer rounded-lg bg-white p-4 shadow"
                  onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
                >
                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="h-40 w-full rounded-md object-cover"
                  />
                  <p>
                    {recipe.strCategory} - {recipe.strArea}
                  </p>
                  <h4 className="mt-2 text-xl font-semibold">
                    {recipe.strMeal}
                  </h4>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-white">
            No recipes found. Try different filters.
          </div>
        )}
      </div>
    </div>
  )
}

export default RecipeList
