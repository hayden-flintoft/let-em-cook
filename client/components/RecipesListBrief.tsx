import { Link } from 'react-router-dom'

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
      <br></br>
      <h3 className="mb-4 mt-8 text-3xl font-semibold text-[#9E3700]">
        {selectedOption} {isCuisine ? 'Cuisine' : 'Category'} Recipes
      </h3>
      {loading ? (
        <div>Loading...</div>
      ) : recipes.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {recipes.map((recipe) => (
            <Link
              key={recipe.idMeal}
              to={`/recipe/${recipe.idMeal}`} // Navigate to the recipe page
              className="shadow-neumorph hover:shadow-neumorph-pressed flex flex-col items-center rounded-3xl p-4"
            >
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="mb-2 h-32 w-32 rounded-full object-cover"
              />
              <span className="text-lg font-semibold">{recipe.strMeal}</span>
            </Link>
          ))}
        </div>
      ) : (
        <div>No recipes found for {selectedOption}</div>
      )}
    </section>
  )
}
