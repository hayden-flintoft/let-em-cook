import { useState, useEffect, useRef, useCallback } from 'react'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import useIngredients from '@/hooks/use-findrecipe'
import { useNavigate } from 'react-router-dom'

export default function SearchPage() {
  const { data: ingredients, isLoading, error } = useIngredients()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
  const [recipes, setRecipes] = useState<any[]>([])
  const [isFetchingRecipes, setIsFetchingRecipes] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const navigate = useNavigate()

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

  const handleSubmit = async () => {
    console.log('Selected Ingredients:', selectedIngredients)
    setRecipes([])
    setPage(1)
    setHasMore(true)
    await fetchRecipes(selectedIngredients, 1)
  }

  const fetchRecipes = async (ingredients: string[], pageNum: number) => {
    if (ingredients.length === 0) return

    setIsFetchingRecipes(true)
    try {
      const query = ingredients.join(',')
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch recipes')
      }

      const data = await response.json()
      const newRecipes = data.meals || []
      const startIndex = (pageNum - 1) * 10
      const endIndex = startIndex + 10
      const paginatedRecipes = newRecipes.slice(startIndex, endIndex)

      setRecipes((prevRecipes) => [...prevRecipes, ...paginatedRecipes])
      setHasMore(endIndex < newRecipes.length)
    } catch (error) {
      console.error('Error fetching recipes:', error)
    } finally {
      setIsFetchingRecipes(false)
    }
  }

  useEffect(() => {
    if (selectedIngredients.length > 0) {
      fetchRecipes(selectedIngredients, page)
    }
  }, [page])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!ingredients) return <div>No ingredients available</div>

  const filteredIngredients = ingredients.filter((ingredient) =>
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
            {/* Cuisine Select */}
            <Select>
              <SelectTrigger className="h-16 w-80 bg-white text-lg font-bold text-gray-700">
                <SelectValue placeholder="Select cuisine..." />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="className h-72 w-full bg-white">
                  {['Italian', 'Chinese', 'Mexican', 'Indian'].map(
                    (cuisine) => (
                      <div
                        key={cuisine}
                        className="flex items-center p-2 hover:bg-gray-100"
                      >
                        <input type="checkbox" id={cuisine} className="mr-2" />
                        <label
                          htmlFor={cuisine}
                          className="cursor-pointer font-bold text-gray-700"
                        >
                          {cuisine}
                        </label>
                      </div>
                    ),
                  )}
                </ScrollArea>
              </SelectContent>
            </Select>

            {/* Ingredients Select with Search */}
            <Select>
              <SelectTrigger className="h-16 w-80 bg-white text-lg font-bold text-gray-700">
                <SelectValue placeholder="Select ingredients..." />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <div className="p-2">
                  <input
                    type="text"
                    placeholder="Search ingredients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-md border p-2"
                  />
                </div>
                <ScrollArea className="h-72 w-full">
                  {filteredIngredients.length > 0 ? (
                    filteredIngredients.map((ingredient) => (
                      <div
                        key={ingredient.idIngredient}
                        className="flex items-center p-2 hover:bg-gray-100"
                      >
                        <input
                          type="checkbox"
                          id={ingredient.strIngredient}
                          checked={selectedIngredients.includes(
                            ingredient.strIngredient,
                          )}
                          onChange={() =>
                            handleIngredientChange(ingredient.strIngredient)
                          }
                          className="mr-2"
                        />
                        <label
                          htmlFor={ingredient.strIngredient}
                          className="cursor-pointer font-bold text-gray-700"
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
              </SelectContent>
            </Select>

            {/* Submit Button */}
            <button
              className="h-16 w-40 rounded bg-blue-500 text-lg font-bold text-white hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>

          {/* Display Recipes after Submission */}
          <div className="mt-8">
            {recipes.length > 0 ? (
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
            )}
            {isFetchingRecipes && (
              <div className="text-white">Loading more recipes...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
