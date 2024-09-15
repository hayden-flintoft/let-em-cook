import { useState, useEffect, useCallback } from 'react'
import { useOutletContext } from 'react-router-dom'
import { getCuisines } from '@/api/cuisines'
import { getCategories } from '@/api/categories'
import useIngredients from '@/hooks/use-findrecipe'
import SearchHeader from '@/components/SearchHeader'
import SearchResultList from '@/components/SearchResultList'
import SearchFooter from '@/components/SearchFooter'

interface Ingredient {
  idIngredient: string
  strIngredient: string
}

interface Recipe {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strCategory: string
  strArea: string
  strInstructions: string
  [key: string]: any // To allow dynamic keys for ingredients and measures
}

interface CuisineOption {
  value: string
  label: string
}

interface CategoryOption {
  value: string
  label: string
}

interface IngredientOption {
  value: string
  label: string
  image: string // Add image URL to the ingredient option
}

interface OutletContextType {
  selectedIngredients: string[]
  setSelectedIngredients: React.Dispatch<React.SetStateAction<string[]>>
  selectedCategories: string[]
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>
  selectedCuisines: string[]
  setSelectedCuisines: React.Dispatch<React.SetStateAction<string[]>>
}

export default function SearchPage() {
  const { data: ingredients, isLoading, error } = useIngredients()
  const [cuisines, setCuisines] = useState<CuisineOption[]>([])
  const [categories, setCategories] = useState<CategoryOption[]>([])
  const [ingredientOptions, setIngredientOptions] = useState<
    IngredientOption[]
  >([])
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [isFetchingRecipes, setIsFetchingRecipes] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const recipesPerPage = 9

  const {
    selectedIngredients,
    setSelectedIngredients,
    selectedCategories,
    setSelectedCategories,
    selectedCuisines,
    setSelectedCuisines,
  } = useOutletContext<OutletContextType>()

  const handleIngredientChange = (selectedOptions: IngredientOption[]) => {
    const selectedValues = selectedOptions.map((option) => option.value)
    setSelectedIngredients(selectedValues)
    setPage(1) // Reset page when filters change
  }

  const handleCategoryChange = (selectedOption: CategoryOption | null) => {
    setSelectedCategories(selectedOption ? [selectedOption.value] : [])
    setPage(1) // Reset page when filters change
  }

  const handleCuisineChange = (selectedOption: CuisineOption | null) => {
    setSelectedCuisines(selectedOption ? [selectedOption.value] : [])
    setPage(1) // Reset page when filters change
  }

  // Add a function to handle clearing all search parameters
  const handleClearParameters = () => {
    setSelectedIngredients([])
    setSelectedCategories([])
    setSelectedCuisines([])
    setPage(1)
    setRecipes([])
  }

  const fetchRecipes = useCallback(
    async (
      ingredients: string[],
      category: string | null,
      cuisine: string | null,
      pageNum: number,
    ) => {
      setIsFetchingRecipes(true)

      try {
        let url = '/api/v1/meals/search?'

        if (ingredients.length > 0) {
          url += `ingredients=${ingredients.join(',')}&`
        }

        if (category) {
          url += `category=${encodeURIComponent(category)}&`
        }

        if (cuisine) {
          url += `cuisine=${encodeURIComponent(cuisine)}&`
        }

        url += `page=${pageNum}&limit=${recipesPerPage}`

        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Failed to fetch recipes')
        }

        const data = await response.json()
        console.log('Fetched Recipes from API:', data)

        const fetchedRecipes = data.meals || []
        setRecipes(fetchedRecipes)
        setHasMore(data.hasMore)
        setTotalPages(Math.ceil(data.totalMeals / recipesPerPage))
      } catch (error) {
        console.error('Error fetching recipes:', error)
      } finally {
        setIsFetchingRecipes(false)
      }
    },
    [],
  )

  useEffect(() => {
    fetchRecipes(
      selectedIngredients,
      selectedCategories[0] || null,
      selectedCuisines[0] || null,
      page,
    )
  }, [
    selectedIngredients,
    selectedCategories,
    selectedCuisines,
    fetchRecipes,
    page,
  ])

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

    const fetchIngredientOptions = () => {
      if (ingredients) {
        const options = ingredients.map((ingredient: Ingredient) => ({
          value: ingredient.strIngredient,
          label: ingredient.strIngredient,
          image: `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png`,
        }))
        setIngredientOptions(options)
      }
    }

    fetchCuisines()
    fetchCategories()
    fetchIngredientOptions()
  }, [ingredients])

  // Move conditional returns AFTER all hooks
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!ingredients) return <div>No ingredients available</div>

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <SearchHeader
        ingredientOptions={ingredientOptions}
        cuisines={cuisines}
        categories={categories}
        selectedIngredients={selectedIngredients}
        selectedCuisines={selectedCuisines}
        selectedCategories={selectedCategories}
        handleIngredientChange={handleIngredientChange}
        handleCuisineChange={handleCuisineChange}
        handleCategoryChange={handleCategoryChange}
        handleClearParameters={handleClearParameters}
      />
      <SearchResultList
        recipes={recipes}
        isFetchingRecipes={isFetchingRecipes}
        hasMore={hasMore}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
      <SearchFooter />
    </div>
  )
}
