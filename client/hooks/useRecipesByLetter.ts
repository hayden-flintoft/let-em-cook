import { useLocation } from 'react-router-dom'
import RecipeListItem from '@/components/RecipeListItem'
import SearchHeader from '@/components/SearchHeader'
import { useCuisines } from '@/hooks/useCuisines'
import { useCategories } from '@/hooks/useCategories'
import { useRecipesByLetter } from '@/hooks/useRecipesByLetter'
import { useFilteredRecipes } from '@/hooks/useFilteredRecipes'
import LoadingSpinner from '@/components/ui/loadingspinner'
import useIngredients from '@/hooks/use-findrecipe'

export default function RecipesByLetterPage() {
  const { recipes, isFetching, lastRecipeElementRef } = useRecipesByLetter()
  const cuisines = useCuisines()
  const categories = useCategories()
  const { data: ingredients, isLoading: ingredientsLoading, error: ingredientsError } = useIngredients()
  const location = useLocation()
  const searchQuery = new URLSearchParams(location.search).get('query')

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])

  const filteredRecipes = useFilteredRecipes(
    recipes,
    selectedCategories,
    selectedCuisines,
    selectedIngredients,
    searchQuery || ''
  )

  const handleIngredientChange = (selectedOptions: any[]) => {
    const selectedValues = selectedOptions.map((option) => option.value)
    setSelectedIngredients(selectedValues)
  }

  const handleCategoryChange = (selectedOption: any) => {
    setSelectedCategories(selectedOption ? [selectedOption.value] : [])
  }

  const handleCuisineChange = (selectedOption: any) => {
    setSelectedCuisines(selectedOption ? [selectedOption.value] : [])
  }

  if (ingredientsLoading) return <LoadingSpinner size={48} color="text-orange-500" />
  if (ingredientsError) return <div>Error: {ingredientsError.message}</div>

  return (
    <div className="container mx-auto p-8">
      <SearchHeader
        ingredientOptions={ingredients}
        cuisines={cuisines}
        categories={categories}
        selectedIngredients={selectedIngredients}
        selectedCuisines={selectedCuisines}
        selectedCategories={selectedCategories}
        handleIngredientChange={handleIngredientChange}
        handleCuisineChange={handleCuisineChange}
        handleCategoryChange={handleCategoryChange}
      />

      <h2 className="mb-8 text-4xl font-bold text-black">Recipes</h2>
      {filteredRecipes.length === 0 ? (
        <div>No recipes found</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredRecipes.map((recipe, index) => (
            <div
              key={recipe.idMeal}
              ref={index === filteredRecipes.length - 1 ? lastRecipeElementRef : null}
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
