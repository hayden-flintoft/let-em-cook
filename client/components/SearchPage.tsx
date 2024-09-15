import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { getCuisines } from '@/api/cuisines'
import { getCategories } from '@/api/categories'
import Select, { components } from 'react-select'
import useIngredients from '@/hooks/use-findrecipe'
import RecipeListItem from '@/components/RecipeListItem'

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
  const navigate = useNavigate()

  const {
    selectedIngredients,
    setSelectedIngredients,
    selectedCategories,
    setSelectedCategories,
    selectedCuisines,
    setSelectedCuisines,
  } = useOutletContext<OutletContextType>()

  const observer = useRef<IntersectionObserver | null>(null)
  const lastRecipeElementRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (isFetchingRecipes) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [isFetchingRecipes, hasMore],
  )

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

        url += `page=${pageNum}`

        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Failed to fetch recipes')
        }

        const data = await response.json()
        console.log('Fetched Recipes from API:', data)

        const fetchedRecipes = data.meals || []

        setRecipes((prevRecipes) =>
          pageNum === 1 ? fetchedRecipes : [...prevRecipes, ...fetchedRecipes],
        )
        setHasMore(data.hasMore)
      } catch (error) {
        console.error('Error fetching recipes:', error)
      } finally {
        setIsFetchingRecipes(false)
      }
    },
    [],
  )

  useEffect(() => {
    setPage(1) // Reset page when filters change
    setRecipes([]) // Reset recipes when filters change
    fetchRecipes(
      selectedIngredients,
      selectedCategories[0] || null,
      selectedCuisines[0] || null,
      1,
    )
  }, [selectedIngredients, selectedCategories, selectedCuisines, fetchRecipes])

  useEffect(() => {
    if (page > 1) {
      fetchRecipes(
        selectedIngredients,
        selectedCategories[0] || null,
        selectedCuisines[0] || null,
        page,
      )
    }
  }, [
    page,
    fetchRecipes,
    selectedIngredients,
    selectedCategories,
    selectedCuisines,
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

  // Custom component to display ingredient images in the dropdown
  const Option = (props: any) => (
    <components.Option {...props}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={props.data.image}
          alt={props.data.label}
          style={{ width: 30, marginRight: 10 }}
        />
        {props.data.label}
      </div>
    </components.Option>
  )

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <img
        src="/images/Meals-by-Chefkraft.png"
        alt="Various delicious meals"
        className="fixed h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
        <div className="container mx-auto p-8">
          <h2 className="mb-8 text-4xl font-bold text-white drop-shadow-lg">
            Select Cuisine and Add Your Ingredients
          </h2>

          <div className="mb-4 flex flex-wrap justify-center space-x-4">
            {/* Ingredients Selection with Search, Multi-select & Images */}
            <div>
              <h3 className="mb-2 text-xl font-bold text-white">
                Select Ingredients
              </h3>
              <Select
                options={ingredientOptions} // Use ingredient options for select
                onChange={handleIngredientChange}
                isClearable
                isMulti // Enable multi-select
                isSearchable // Enable searchable dropdown
                placeholder="Search and select ingredients..."
                className="w-64 text-black"
                components={{ Option }} // Use custom Option component to display images
                value={ingredientOptions.filter((option) =>
                  selectedIngredients.includes(option.value),
                )}
              />
            </div>

            {/* Cuisine Selection */}
            <div>
              <h3 className="mb-2 text-xl font-bold text-white">
                Select Cuisine
              </h3>
              <Select
                options={cuisines}
                onChange={handleCuisineChange}
                isClearable
                placeholder="Select Cuisine..."
                className="w-64 text-black"
                value={
                  selectedCuisines.length > 0
                    ? cuisines.find(
                        (option) => option.value === selectedCuisines[0],
                      )
                    : null
                }
              />
            </div>

            {/* Category Selection */}
            <div>
              <h3 className="mb-2 text-xl font-bold text-white">
                Select Category
              </h3>
              <Select
                options={categories} // Use react-select for categories
                onChange={handleCategoryChange}
                isClearable
                placeholder="Select Category..."
                className="w-64 text-black"
                value={
                  selectedCategories.length > 0
                    ? categories.find(
                        (option) => option.value === selectedCategories[0],
                      )
                    : null
                }
              />
            </div>
          </div>

          {/* Search Parameters and Status */}
          {/* TODO: Remove in Production */}
          <div className="mt-4 text-white">
            <h3 className="mb-2 text-2xl font-bold">Search Parameters:</h3>
            <p>
              <strong>Ingredients:</strong>{' '}
              {selectedIngredients.length > 0
                ? selectedIngredients.join(', ')
                : 'Any'}
            </p>
            <p>
              <strong>Category:</strong> {selectedCategories[0] || 'Any'}
            </p>
            <p>
              <strong>Cuisine:</strong> {selectedCuisines[0] || 'Any'}
            </p>
            <p>
              <strong>Status:</strong>{' '}
              {isFetchingRecipes
                ? 'Loading...'
                : `${recipes.length} recipe(s) found`}
            </p>
            {/* Clear Parameters Button */}
            <div className="flex items-end">
              <button
                onClick={handleClearParameters}
                className="mt-6 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600"
              >
                Clear Parameters
              </button>
            </div>
          </div>

          {/* Display Recipes */}
          <div className="mt-8">
            {recipes.length > 0 ? (
              <div>
                <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {recipes.map((recipe, index) => (
                    <li
                      key={recipe.idMeal}
                      ref={
                        index === recipes.length - 1 && hasMore
                          ? lastRecipeElementRef
                          : null
                      }
                    >
                      <RecipeListItem recipe={recipe} layout="card" />
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              !isFetchingRecipes && (
                <div className="text-white">
                  No recipes found. Try different filters.
                </div>
              )
            )}
            {isFetchingRecipes && (
              <div className="mt-4 flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-white"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
