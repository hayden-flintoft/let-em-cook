import { useState, useEffect, useRef, useCallback } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import useIngredients from '@/hooks/use-findrecipe'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { getLatestMeals } from '@/api/meal'

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
  // Include other properties if needed
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
  const [searchTerm, setSearchTerm] = useState('')
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

  const categories = ['Vegetarian', 'Vegan', 'Dessert', 'Breakfast']
  const cuisines = ['Italian', 'Chinese', 'Mexican', 'Indian']

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

  const handleIngredientChange = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient],
    )
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) => (prev.includes(category) ? [] : [category]))
  }

  const handleCuisineChange = (cuisine: string) => {
    setSelectedCuisines((prev) => (prev.includes(cuisine) ? [] : [cuisine]))
  }

  const fetchRecipes = useCallback(
    async (
      ingredients: string[],
      category: string | null,
      cuisine: string | null,
      pageNum: number,
    ) => {
      console.log('Fetching recipes:', ingredients, category, cuisine, pageNum)
      if (ingredients.length === 0) return

      setIsFetchingRecipes(true)
      try {
        const query = ingredients.join(',')
        const categoryParam = category
          ? `&category=${encodeURIComponent(category)}`
          : ''
        const cuisineParam = cuisine
          ? `&cuisine=${encodeURIComponent(cuisine)}`
          : ''
        const url = `/api/v1/meals/ingredients/${query}?${categoryParam}${cuisineParam}`

        console.log('Fetching recipes from URL:', url)

        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Failed to fetch recipes')
        }

        const data = await response.json()
        console.log('Fetched Recipes from API:', data)

        const newRecipes = data || []
        const startIndex = (pageNum - 1) * 10
        const endIndex = startIndex + 10
        const paginatedRecipes = newRecipes.slice(startIndex, endIndex)

        setRecipes((prevRecipes) => [...paginatedRecipes])
        setHasMore(endIndex < newRecipes.length)
      } catch (error) {
        console.error('Error fetching recipes:', error)
      } finally {
        setIsFetchingRecipes(false)
      }
    },
    [],
  )

  const fetchLatestMeals = useCallback(async () => {
    try {
      setIsFetchingRecipes(true)
      const meals = await getLatestMeals()
      setLatestMeals(meals)
    } catch (error) {
      console.error('Error fetching latest meals:', error)
    } finally {
      setIsFetchingRecipes(false)
    }
  }, [])

  useEffect(() => {
    console.log('Selected Ingredients:', selectedIngredients)
    console.log('Selected Category:', selectedCategories[0] || null)
    console.log('Selected Cuisine:', selectedCuisines[0] || null)
    if (selectedIngredients.length > 0) {
      fetchRecipes(
        selectedIngredients,
        selectedCategories[0] || null,
        selectedCuisines[0] || null,
        page,
      )
    } else {
      fetchLatestMeals()
    }
  }, [
    page,
    selectedIngredients,
    selectedCategories,
    selectedCuisines,
    fetchRecipes,
    fetchLatestMeals,
  ])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!ingredients) return <div>No ingredients available</div>

  const filteredIngredients = ingredients.filter((ingredient: Ingredient) =>
    ingredient.strIngredient.toLowerCase().includes(searchTerm.toLowerCase()),
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
              {cuisines.map((cuisine) => (
                <div key={cuisine}>
                  <input
                    type="checkbox"
                    id={`cuisine-${cuisine}`}
                    checked={selectedCuisines.includes(cuisine)}
                    onChange={() => handleCuisineChange(cuisine)}
                  />
                  <label
                    htmlFor={`cuisine-${cuisine}`}
                    className="ml-2 text-white"
                  >
                    {cuisine}
                  </label>
                </div>
              ))}
            </div>

            {/* Category Selection */}
            <div>
              <h3 className="mb-2 text-xl font-bold text-white">
                Select Category
              </h3>
              {categories.map((category) => (
                <div key={category}>
                  <input
                    type="checkbox"
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <label
                    htmlFor={`category-${category}`}
                    className="ml-2 text-white"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>

            {/* Ingredients Selection with Search */}
            <div>
              <h3 className="mb-2 text-xl font-bold text-white">
                Select Ingredients
              </h3>
              <input
                type="text"
                placeholder="Search ingredients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md border p-2"
              />
              <ScrollArea className="h-72 w-full">
                {filteredIngredients.length > 0 ? (
                  filteredIngredients.map((ingredient) => (
                    <div key={ingredient.idIngredient}>
                      <input
                        type="checkbox"
                        id={`ingredient-${ingredient.idIngredient}`}
                        checked={selectedIngredients.includes(
                          ingredient.strIngredient,
                        )}
                        onChange={() =>
                          handleIngredientChange(ingredient.strIngredient)
                        }
                      />
                      <label
                        htmlFor={`ingredient-${ingredient.idIngredient}`}
                        className="ml-2 text-white"
                      >
                        {ingredient.strIngredient}
                      </label>
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-gray-500">
                    No ingredients match your search.
                  </div>
                )}
              </ScrollArea>

              {/* Clear Ingredients Button */}
              <button
                className="mt-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                onClick={() => setSelectedIngredients([])}
              >
                Clear Ingredients
              </button>
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
