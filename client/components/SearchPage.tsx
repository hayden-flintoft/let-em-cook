import { useState, useEffect, useRef, useCallback } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import useIngredients from '@/hooks/use-findrecipe'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { getLatestMeals } from '@/api/meal'
import { getCuisines } from '@/api/cuisines'
import { getCategories } from '@/api/categories'
import Select, { components } from 'react-select'

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
  const [latestMeals, setLatestMeals] = useState<Recipe[]>([])
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

  const fetchRecipes = useCallback(
    async (
      ingredients: string[],
      category: string | null,
      cuisine: string | null,
      pageNum: number,
    ) => {
      if (ingredients.length === 0) return

      console.log('Fetching recipes:', ingredients, category, cuisine, pageNum)

      setIsFetchingRecipes(true)
      try {
        const query = ingredients.join(',')
        let url = `/api/v1/meals/ingredients/${query}`

        // Append category and cuisine parameters to the URL if provided
        if (category) {
          url += `&category=${encodeURIComponent(category)}`
        }
        if (cuisine) {
          url += `&cuisine=${encodeURIComponent(cuisine)}`
        }

        console.log('Fetching recipes from URL:', url)

        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Failed to fetch recipes')
        }

        const data = await response.json()
        console.log('Fetched Recipes from API:', data)

        const startIndex = (pageNum - 1) * 10
        const endIndex = startIndex + 10
        const paginatedRecipes = data.slice(startIndex, endIndex)

        setRecipes((prevRecipes) =>
          pageNum === 1
            ? paginatedRecipes
            : [...prevRecipes, ...paginatedRecipes],
        )
        setHasMore(endIndex < data.length)
      } catch (error) {
        console.error('Error fetching recipes:', error)
      } finally {
        setIsFetchingRecipes(false)
      }
    },
    [],
  )

  const fetchLatestMeals = useCallback(async () => {
    setIsFetchingRecipes(true)
    try {
      const meals = await getLatestMeals()
      setLatestMeals(meals)
    } catch (error) {
      console.error('Error fetching latest meals:', error)
    } finally {
      setIsFetchingRecipes(false)
    }
  }, [])

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
          image: `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png`, // Add image URL
        }))
        setIngredientOptions(options)
      }
    }

    fetchCuisines()
    fetchCategories()
    fetchIngredientOptions() // Fetch ingredient options
  }, [ingredients])

  useEffect(() => {
    if (selectedIngredients.length > 0) {
      setRecipes([]) // Reset recipes when filters change
      fetchRecipes(
        selectedIngredients,
        selectedCategories[0] || null,
        selectedCuisines[0] || null,
        1, // Always start with page 1 on new search
      )
    } else {
      setRecipes([]) // Reset recipes when switching to latest meals
      fetchLatestMeals()
    }
  }, [
    selectedIngredients,
    selectedCategories,
    selectedCuisines,
    fetchRecipes,
    fetchLatestMeals,
  ])

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

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!ingredients) return <div>No ingredients available</div>

  // Custom component to display ingredient images in the dropdown (with image left of the label)
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

          <div className="mb-4 flex justify-center space-x-4">
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
                className="text-black"
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
                className="text-black"
              />
            </div>

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
                className="text-black"
                components={{ Option }} // Use custom Option component to display images
              />
            </div>
          </div>

          {/* Display Recipes or Latest Meals */}
          <div className="mt-8">
            {selectedIngredients.length > 0 ? (
              recipes.length > 0 ? (
                <div>
                  <h3 className="mb-4 text-2xl font-bold text-white">
                    Recipes Found:
                  </h3>
                  <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {recipes.map((recipe, index) => (
                      <li
                        key={recipe.idMeal}
                        ref={
                          index === recipes.length - 1
                            ? lastRecipeElementRef
                            : null
                        }
                        className="cursor-pointer rounded-lg bg-white p-4 shadow"
                        onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
                      >
                        <img
                          src={recipe.strMealThumb}
                          alt={recipe.strMeal}
                          className="h-40 w-full rounded-md object-cover"
                        />
                        <p>
                          {recipe.strCategory} - {recipe.strArea}
                        </p>
                        <h4 className="mt-2 text-xl font-semibold">
                          {recipe.strMeal}
                        </h4>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="text-white">
                  No recipes found. Try different ingredients.
                </div>
              )
            ) : latestMeals.length > 0 ? (
              <div>
                <h3 className="mb-4 text-2xl font-bold text-white">
                  Latest Meals:
                </h3>
                <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {latestMeals.map((meal) => (
                    <li
                      key={meal.idMeal}
                      className="cursor-pointer rounded-lg bg-white p-4 shadow"
                      onClick={() => navigate(`/recipe/${meal.idMeal}`)}
                    >
                      <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        className="h-40 w-full rounded-md object-cover"
                      />
                      <p>
                        {meal.strCategory} - {meal.strArea}
                      </p>
                      <h4 className="mt-2 text-xl font-semibold">
                        {meal.strMeal}
                      </h4>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-white">
                No latest meals available at the moment.
              </div>
            )}
            {isFetchingRecipes && <div className="text-white">Loading...</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
