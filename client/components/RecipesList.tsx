import React, { useCallback } from 'react'
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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe, index) => (
        <div
          key={recipe.idMeal}
          ref={index === recipes.length - 1 ? lastRecipeElementRef : null}
        >
          <RecipeListItem recipe={recipe} layout="card" />
        </div>
      ))}
      {isFetching && <div>Loading more...</div>}
    </div>
  )
}

export default RecipesList
