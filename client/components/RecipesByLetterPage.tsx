import React, { useState, useEffect, useRef, useCallback } from 'react'
import RecipeListItem from '@/components/RecipeListItem'
import SearchHeader from '@/components/SearchHeader'
import { getCuisines } from '@/api/cuisines'
import { getCategories } from '@/api/categories'
import useIngredients from '@/hooks/use-findrecipe'

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
      setRecipes((prevRecipes) => [...prevRecipes, ...fetchedRecipes])
    } catch (error) {
      console.error('Error fetching recipes:', error)
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

  // Apply filters from SearchHeader to the recipes
  useEffect(() => {
    let filtered = [...recipes]

    // Filter by ingredients
    if (selectedIngredients.length > 0) {
      filtered = filtered.filter((recipe) =>
        selectedIngredients.every((ingredient) =>
          Object.values(recipe).includes(ingredient),
        ),
      )
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(
        (recipe) => recipe.strCategory === selectedCategories[0],
      )
    }

    // Filter by cuisines
    if (selectedCuisines.length > 0) {
      filtered = filtered.filter(
        (recipe) => recipe.strArea === selectedCuisines[0],
      )
    }

    setFilteredRecipes(filtered)
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

  // Show loading or error if necessary
  if (ingredientsLoading) return <div>Loading...</div>
  if (ingredientsError) return <div>Error: {ingredientsError.message}</div>

  return (
    <div className="container mx-auto p-8">
      {/* Include SearchHeader */}
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

      <h2 className="mb-8 text-4xl font-bold text-black">Recipes A to Z</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredRecipes.map((recipe, index) => (
          <div
            key={recipe.idMeal}
            ref={
              index === filteredRecipes.length - 1 ? lastRecipeElementRef : null
            }
          >
            <RecipeListItem recipe={recipe} layout="card" />
          </div>
        ))}
      </div>
      {isFetching && (
        <div className="mt-4 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-black"></div>
        </div>
      )}
    </div>
  )
}
