// client/components/RecipesByLetterPage.tsx
import { useState, useEffect, useRef, useCallback, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import SearchHeader from '@/components/SearchHeader'
import { getCuisines } from '@/api/cuisines'
import { getCategories } from '@/api/categories'
import useIngredients from '@/hooks/use-findrecipe'
import { MealListItem } from '../../models/meals'
import { Ingredient } from '../../models/ingredients'
import { childIngredientsMap } from '../../models/mapping'
import LoadingSpinner from '@/components/ui/loadingspinner'
import ScrollToTopFAB from '@/components/ScrollToTopFAB'
import RecipesList from '@/components/RecipesList'
import { DataContext } from '../context/DataContext'

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

export default function RecipesByLetterPage() {
  const dataContext = useContext(DataContext)
  const [filteredRecipes, setFilteredRecipes] = useState<MealListItem[]>([])
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0)
  const [isFetching, setIsFetching] = useState(false)
  const [hasMoreLetters, setHasMoreLetters] = useState(true)
  const [noRecipesFound, setNoRecipesFound] = useState(false)
  const [resultsFound, setResultsFound] = useState(false)
  const {
    data: ingredients,
    isLoading: ingredientsLoading,
    error: ingredientsError,
  } = useIngredients()

  const [ingredientOptions, setIngredientOptions] = useState<Ingredient[]>([])
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])
  const [cuisines, setCuisines] = useState([])
  const [categories, setCategories] = useState([])

  const observer = useRef<IntersectionObserver | null>(null)
  const location = useLocation()
  const searchQuery = new URLSearchParams(location.search).get('query')

  if (!dataContext) {
    throw new Error('RecipesByLetterPage must be used within a DataProvider')
  }

  const { recipes: contextRecipes, setRecipes: setContextRecipes } = dataContext

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
        setContextRecipes((prevRecipes) => [...prevRecipes, ...fetchedRecipes])
        setNoRecipesFound(false)
        setResultsFound(true)
      } else if (currentLetterIndex < alphabet.length - 1) {
        setCurrentLetterIndex((prevIndex) => prevIndex + 1)
      } else {
        if (!resultsFound) {
          setNoRecipesFound(true)
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

  // Apply child ingredients logic
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

  // Apply filtering whenever filters or search query change
  useEffect(() => {
    let filtered = [...contextRecipes]

    // Apply category filter if selected
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((recipe) =>
        selectedCategories.includes(recipe.strCategory),
      )
    }

    // Expand selected ingredients to include related child ingredients
    const expandedIngredients = expandIngredients(selectedIngredients)

    // Apply ingredient filter if selected
    if (expandedIngredients.length > 0) {
      filtered = filtered.filter((recipe) => {
        const recipeIngredients = Object.values(recipe).filter(
          (value) =>
            typeof value === 'string' &&
            expandedIngredients.some((ingredient) =>
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

    // Filter based on search query
    if (searchQuery) {
      filtered = filtered.filter((recipe) =>
        recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredRecipes(filtered)

    // If no recipes after filtering, continue fetching the next letter
    if (filtered.length === 0 && currentLetterIndex < alphabet.length - 1) {
      setCurrentLetterIndex((prevIndex) => prevIndex + 1)
    }
  }, [
    contextRecipes,
    selectedIngredients,
    selectedCategories,
    selectedCuisines,
    searchQuery,
    currentLetterIndex,
  ])

  const handleIngredientChange = (selectedOptions: any[]) => {
    const selectedValues = selectedOptions.map((option) => option.value)
    const expandedValues = expandIngredients(selectedValues)
    setSelectedIngredients(expandedValues)
  }

  const handleCategoryChange = (selectedOption: any) => {
    setSelectedCategories(selectedOption ? [selectedOption.value] : [])
  }

  const handleCuisineChange = (selectedOption: any) => {
    setSelectedCuisines(selectedOption ? [selectedOption.value] : [])
  }

  const handleClearParameters = () => {
    setSelectedIngredients([])
    setSelectedCategories([])
    setSelectedCuisines([])
  }

  if (ingredientsLoading)
    return <LoadingSpinner size={48} color="text-[#9E3700]" />
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
      <br />

      <img className="mx-auto w-40" src="/images/recipes.png" alt="Title" />

      <br />

      {noRecipesFound && !resultsFound ? (
        <div className="text-center text-xl text-[#9E3700]">
          No recipes found with the current filters.
        </div>
      ) : (
        <RecipesList
          recipes={filteredRecipes}
          isFetching={isFetching}
          lastRecipeElementRef={lastRecipeElementRef}
        />
      )}

      {isFetching && <LoadingSpinner size={48} color="text-orange-500" />}

      {/* Scroll to Top Button */}
      <ScrollToTopFAB />
    </div>
  )
}
