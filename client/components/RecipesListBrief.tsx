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

      <h3 className="mb-4 mt-8 text-lg font-semibold md:text-2xl">

        {selectedOption} {isCuisine ? 'Cuisine' : 'Category'} Recipes
      </h3>
      {loading ? (
        <div>Loading...</div>
      ) : recipes.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {recipes.map((recipe) => (
            <Link
              key={recipe.idMeal}
              to={`/recipe/${recipe.idMeal}`}
              className="shadow-neumorph hover:shadow-neumorph-pressed flex flex-col items-center rounded-lg p-4"

            >
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="mb-2 h-20 w-20 rounded-full object-cover md:h-32 md:w-32"
              />
              <span className="text-base font-semibold md:text-lg">
                {recipe.strMeal}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div>No recipes found for {selectedOption}</div>
      )}
    </section>
  )
}
