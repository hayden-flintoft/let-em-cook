import React from 'react'

interface FiltersDebugInfoProps {
  searchQuery: string | null
  selectedIngredients: string[]
  selectedCuisines: string[]
  selectedCategories: string[]
}

const FiltersDebugInfo: React.FC<FiltersDebugInfoProps> = ({
  searchQuery,
  selectedIngredients,
  selectedCuisines,
  selectedCategories,
}) => {
  return (
    <div className="mb-4 rounded-lg bg-gray-100 p-4 shadow-md">
      <h3 className="text-xl font-semibold">Debug Information</h3>
      <p>
        <strong>Search Query:</strong> {searchQuery || 'None'}
      </p>
      <p>
        <strong>Selected Ingredients:</strong>{' '}
        {selectedIngredients.length > 0
          ? selectedIngredients.join(', ')
          : 'None'}
      </p>
      <p>
        <strong>Selected Cuisines:</strong>{' '}
        {selectedCuisines.length > 0 ? selectedCuisines.join(', ') : 'None'}
      </p>
      <p>
        <strong>Selected Categories:</strong>{' '}
        {selectedCategories.length > 0 ? selectedCategories.join(', ') : 'None'}
      </p>
    </div>
  )
}

export default FiltersDebugInfo
