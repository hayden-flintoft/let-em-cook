// client/hooks/useFetchRecipes.ts
import { useState, useEffect } from 'react'

export const useFetchRecipes = (selectedOption: string, isCuisine: boolean) => {
  const [recipes, setRecipes] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (selectedOption) {
      fetchRecipes(selectedOption, isCuisine)
    }
  }, [selectedOption, isCuisine])

  const fetchRecipes = async (option: string, isCuisine: boolean) => {
    setLoading(true)
    try {
      const apiUrl = isCuisine
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?a=${option}` // Cuisine API
        : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${option}` // Category API

      const response = await fetch(apiUrl)
      const data = await response.json()
      setRecipes(data.meals || [])
    } catch (error) {
      console.error('Error fetching recipes:', error)
      setRecipes([])
    } finally {
      setLoading(false)
    }
  }

  return { recipes, loading }
}
