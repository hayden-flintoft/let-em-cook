import React from 'react'
import RecipeListItem from '@/components/RecipeListItem'

interface RecipesListProps {
  recipes: any[]
  lastRecipeElementRef: (node: HTMLDivElement | null) => void
  isFetching: boolean
}

const RecipesList: React.FC<RecipesListProps> = ({
  recipes,
  lastRecipeElementRef,
  isFetching,
}) => {
  return (
    <div className="flex justify-center">
      <div className="mx-auto grid w-full max-w-screen-lg grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {' '}
        {/* Ensure a consistent width grid */}
        {recipes.map((recipe, index) => (
          <div
            key={recipe.idMeal}
            ref={index === recipes.length - 1 ? lastRecipeElementRef : null}
            className="w-full max-w-sm" // Consistent width for each card
          >
            <RecipeListItem recipe={recipe} layout="card" />
          </div>
        ))}
        {/* {isFetching && <div>Loading more...</div>} */}
      </div>
    </div>
  )
}

export default RecipesList
