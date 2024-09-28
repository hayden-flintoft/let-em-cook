// client/components/RecipesList.tsx
import React from 'react'
import RecipeListItem from '@/components/RecipeListItem'

interface RecipesListProps {
  recipes: any[]
  isFetching: boolean
  lastRecipeElementRef?: (node: HTMLDivElement | null) => void // Make it optional
}

const RecipesList: React.FC<RecipesListProps> = ({
  recipes,
  isFetching,
  lastRecipeElementRef,
}) => {
  return (
    <div className="flex justify-center">
      <div className="mx-auto grid w-full max-w-screen-lg grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {recipes.map((recipe, index) => {
          if (lastRecipeElementRef && recipes.length === index + 1) {
            return (
              <div key={recipe.idMeal} ref={lastRecipeElementRef}>
                <RecipeListItem recipe={recipe} layout="card" />
              </div>
            )
          } else {
            return (
              <div key={recipe.idMeal}>
                <RecipeListItem recipe={recipe} layout="card" />
              </div>
            )
          }
        })}
        {isFetching && (
          <div className="col-span-full text-center text-gray-500">
            Loading more...
          </div>
        )}
      </div>
    </div>
  )
}

export default RecipesList
