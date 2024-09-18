import { useState, useEffect } from 'react'

export function useFetchRecipesCount() {
  const [recipeCounts, setRecipeCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecipeCounts = async () => {
      try {
        // Fetch recipe counts by cuisine and category
        const responseCuisines = await fetch('/api/v1/recipes/count/cuisines')
        const responseCategories = await fetch(
          '/api/v1/recipes/count/categories',
        )

        const cuisineCounts = await responseCuisines.json()
        const categoryCounts = await responseCategories.json()

        const combinedCounts = {
          ...cuisineCounts,
          ...categoryCounts,
        }

        setRecipeCounts(combinedCounts)
      } catch (error) {
        console.error('Error fetching recipe counts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipeCounts()
  }, [])

  return { recipeCounts, loading }
}
