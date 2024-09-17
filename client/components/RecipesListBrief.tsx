import RecipeListItem from './RecipeListItem'

interface RecipesListProps {
  recipes: any[]
  loading: boolean
  selectedOption: string | null
  isCuisine: boolean
}

export default function RecipesList({
  recipes,
  loading,
  selectedOption,
  isCuisine,
}: RecipesListProps) {
  return (
    <section>
      <h3 className="mb-4 mt-8 text-lg font-semibold md:text-2xl">
        {selectedOption} {isCuisine ? 'Cuisine' : 'Category'} Recipes
      </h3>

      {loading ? (
        <div>Loading...</div>
      ) : recipes.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeListItem key={recipe.idMeal} recipe={recipe} layout="card" />
          ))}
        </div>
      ) : (
        <div>No recipes found for {selectedOption}</div>
      )}
    </section>
  )
}
