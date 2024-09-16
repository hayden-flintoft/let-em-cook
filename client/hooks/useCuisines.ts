import { useState, useEffect } from 'react'
import { getCuisines } from '@/api/cuisines'

export const useCuisines = () => {
  const [cuisines, setCuisines] = useState([])

  useEffect(() => {
    const fetchCuisines = async () => {
      try {
        const fetchedCuisines = await getCuisines()
        const cuisineOptions = fetchedCuisines.map((cuisine: string) => ({
          value: cuisine,
          label: cuisine,
        }))
        setCuisines(cuisineOptions)
      } catch (err) {
        console.error('Error fetching cuisines:', err)
      }
    }

    fetchCuisines()
  }, [])

  return cuisines
}
