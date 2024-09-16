import { useState, useEffect } from 'react'
import { getCategories } from '@/api/categories'

export const useCategories = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories()
        const categoryOptions = fetchedCategories.map((category: string) => ({
          value: category,
          label: category,
        }))
        setCategories(categoryOptions)
      } catch (err) {
        console.error('Error fetching categories:', err)
      }
    }

    fetchCategories()
  }, [])

  return categories
}
