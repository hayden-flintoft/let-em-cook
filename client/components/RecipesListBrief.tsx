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
      <br></br>
      <h3 className="mb-4 mt-8 text-center text-3xl font-bold text-[#9E3700]">
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
