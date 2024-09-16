import { useState, useEffect, useRef, useCallback } from 'react'
import RecipeListItem from '@/components/RecipeListItem'
import SearchHeader from '@/components/SearchHeader'
import { getCuisines } from '@/api/cuisines'
import { getCategories } from '@/api/categories'
import useIngredients from '@/hooks/use-findrecipe'
import { Ingredient } from 'models/ingredients'
import LoadingSpinner from '@/components/ui/loadingspinner'

interface Recipe {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strCategory: string
  strArea: string
  strInstructions: string
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
  image: string
}

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

export default function RecipesByLetterPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([])
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0)
  const [isFetching, setIsFetching] = useState(false)
  const [hasMoreLetters, setHasMoreLetters] = useState(true)
  const [noRecipesFound, setNoRecipesFound] = useState(false)
  const [resultsFound, setResultsFound] = useState(false) // Track if any results are found

  const {
    data: ingredients,
    isLoading: ingredientsLoading,
    error: ingredientsError,
  } = useIngredients()

  const [ingredientOptions, setIngredientOptions] = useState<
    IngredientOption[]
  >([])
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])
  const [cuisines, setCuisines] = useState<CuisineOption[]>([])
  const [categories, setCategories] = useState<CategoryOption[]>([])

  const observer = useRef<IntersectionObserver | null>(null)

  const lastRecipeElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetching) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreLetters) {
          setCurrentLetterIndex((prevIndex) => prevIndex + 1)
        }
      })

      if (node) observer.current.observe(node)
    },
    [isFetching, hasMoreLetters],
  )

  const fetchRecipesByLetter = async (letter: string) => {
    setIsFetching(true)
    try {
      const response = await fetch(`/api/v1/meals/by-letter?letter=${letter}`)
      if (!response.ok) {
        throw new Error('Failed to fetch recipes')
      }
      const data = await response.json()
      const fetchedRecipes = data.meals || []

      if (fetchedRecipes.length > 0) {
        setRecipes((prevRecipes) => [...prevRecipes, ...fetchedRecipes])
        setNoRecipesFound(false)
        setResultsFound(true) // Mark results found
      } else if (currentLetterIndex < alphabet.length - 1) {
        // Move to the next letter if no recipes for the current letter
        setCurrentLetterIndex((prevIndex) => prevIndex + 1)
      } else {
        // If no results found and we've reached the end of the alphabet
        if (!resultsFound) {
          setNoRecipesFound(true) // Only set to true if no results found across all letters
        }
      }
    } catch (error) {
      console.error('Error fetching recipes:', error)
      setNoRecipesFound(true)
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    if (currentLetterIndex < alphabet.length) {
      const letter = alphabet[currentLetterIndex]
      fetchRecipesByLetter(letter)
    } else {
      setHasMoreLetters(false)
    }
  }, [currentLetterIndex])

  // Fetch cuisines and categories
  useEffect(() => {
    const fetchCuisines = async () => {
      try {
        const fetchedCuisines = await getCuisines()
        const cuisineOptions = fetchedCuisines.map((cuisine: any) => ({
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
        const categoryOptions = fetchedCategories.map((category: any) => ({
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

  // Apply filtering whenever filters change or recipes are fetched
  useEffect(() => {
    let filtered = [...recipes]

    // Apply category filter if selected
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((recipe) =>
        selectedCategories.includes(recipe.strCategory),
      )
    }

    // Apply ingredient filter if selected
    if (selectedIngredients.length > 0) {
      filtered = filtered.filter((recipe) => {
        const recipeIngredients = Object.values(recipe).filter(
          (value) =>
            typeof value === 'string' &&
            selectedIngredients.some((ingredient) =>
              value.toLowerCase().includes(ingredient.toLowerCase()),
            ),
        )
        return recipeIngredients.length > 0
      })
    }

    // Apply cuisine filter if selected
    if (selectedCuisines.length > 0) {
      filtered = filtered.filter((recipe) =>
        selectedCuisines.includes(recipe.strArea),
      )
    }

    setFilteredRecipes(filtered)

    // If no recipes after filtering, continue fetching the next letter
    if (filtered.length === 0 && currentLetterIndex < alphabet.length - 1) {
      setCurrentLetterIndex((prevIndex) => prevIndex + 1)
    }
  }, [recipes, selectedIngredients, selectedCategories, selectedCuisines])

  const handleIngredientChange = (selectedOptions: IngredientOption[]) => {
    const selectedValues = selectedOptions.map((option) => option.value)
    setSelectedIngredients(selectedValues)
  }

  const handleCategoryChange = (selectedOption: CategoryOption | null) => {
    setSelectedCategories(selectedOption ? [selectedOption.value] : [])
  }

  const handleCuisineChange = (selectedOption: CuisineOption | null) => {
    setSelectedCuisines(selectedOption ? [selectedOption.value] : [])
  }

  const handleClearParameters = () => {
    setSelectedIngredients([])
    setSelectedCategories([])
    setSelectedCuisines([])
  }

  if (ingredientsLoading)
    return <LoadingSpinner size={48} color="text-orange-500" />
  if (ingredientsError) return <div>Error: {ingredientsError.message}</div>

  return (
    <div className="container mx-auto p-8">
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

      <h2 className="mb-8 text-4xl font-bold text-black">Recipes</h2>
      {noRecipesFound && !resultsFound ? (
        <div className="text-center text-xl text-red-500">
          No recipes found with the current filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredRecipes.map((recipe, index) => (
            <div
              key={recipe.idMeal}
              ref={
                index === filteredRecipes.length - 1
                  ? lastRecipeElementRef
                  : null
              }
            >
              <RecipeListItem recipe={recipe} layout="card" />
            </div>
          ))}
        </div>
      )}
      {isFetching && <LoadingSpinner size={48} color="text-orange-500" />}
    </div>
  )
}
