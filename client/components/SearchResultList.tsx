import React from 'react'
import RecipeListItem from '@/components/RecipeListItem'
import ScrollToTopFAB from './ScrollToTopFAB'

interface Recipe {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strCategory: string
  strArea: string
  strInstructions: string
  [key: string]: any
}

interface SearchResultListProps {
  recipes: Recipe[]
  isFetchingRecipes: boolean
  hasMore: boolean
  page: number
  totalPages: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const SearchResultList: React.FC<SearchResultListProps> = ({
  recipes,
  isFetchingRecipes,
  hasMore,
  page,
  totalPages,
  setPage,
}) => {
  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1)
  }

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1)
  }

  return (
    <div className="container mx-auto p-8">
      {/* Pagination Controls at the Top */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className={`rounded px-4 py-2 ${
            page === 1
              ? 'cursor-not-allowed bg-gray-300'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Previous
        </button>
        <span className="text-white">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={!hasMore}
          className={`rounded px-4 py-2 ${
            !hasMore
              ? 'cursor-not-allowed bg-gray-300'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Next
        </button>
      </div>

      {/* Display Recipes */}
      <div className="mt-8">
        {recipes.length > 0 ? (
          <div>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recipes.map((recipe) => (
                <li key={recipe.idMeal}>
                  <RecipeListItem recipe={recipe} layout="card" />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          !isFetchingRecipes && (
            <div className="text-white">
              No recipes found. Try different filters.
            </div>
          )
        )}
        {isFetchingRecipes && (
          <div className="mt-4 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-white"></div>
          </div>
        )}
      </div>

      {/* Pagination Controls at the Bottom */}
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className={`rounded px-4 py-2 ${
            page === 1
              ? 'cursor-not-allowed bg-gray-300'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Previous
        </button>
        <span className="text-white">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={!hasMore}
          className={`rounded px-4 py-2 ${
            !hasMore
              ? 'cursor-not-allowed bg-gray-300'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default SearchResultList
