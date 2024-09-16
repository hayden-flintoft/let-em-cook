import { useEffect, useState } from 'react'
import { childIngredientsMap } from '@/models/mapping'

export const useFilteredRecipes = (
  recipes: any[],
  selectedCategories: string[],
  selectedCuisines: string[],
  selectedIngredients: string[],
  searchQuery: string,
) => {
  const [filteredRecipes, setFilteredRecipes] = useState([])

  const expandIngredients = (ingredients: string[]) => {
    let expandedIngredients = [...ingredients]
    ingredients.forEach((ingredient) => {
      if (childIngredientsMap[ingredient.toLowerCase()]) {
        expandedIngredients = [
          ...expandedIngredients,
          ...childIngredientsMap[ingredient.toLowerCase()],
        ]
      }
    })
    return expandedIngredients
  }

  useEffect(() => {
    let filtered = [...recipes]

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((recipe) =>
        selectedCategories.includes(recipe.strCategory),
      )
    }

    // Expand ingredients and filter by ingredients
    const expandedIngredients = expandIngredients(selectedIngredients)
    if (expandedIngredients.length > 0) {
      filtered = filtered.filter((recipe) =>
        expandedIngredients.some((ingredient) =>
          Object.values(recipe).some((value) =>
            value?.toLowerCase().includes(ingredient.toLowerCase()),
          ),
        ),
      )
    }

    // Filter by cuisines
    if (selectedCuisines.length > 0) {
      filtered = filtered.filter((recipe) =>
        selectedCuisines.includes(recipe.strArea),
      )
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((recipe) =>
        recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredRecipes(filtered)
  }, [
    recipes,
    selectedCategories,
    selectedCuisines,
    selectedIngredients,
    searchQuery,
  ])

  return filteredRecipes
}
