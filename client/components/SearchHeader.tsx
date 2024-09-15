import React from 'react'
import Select, { components } from 'react-select'

interface IngredientOption {
  value: string
  label: string
  image: string
}

interface CuisineOption {
  value: string
  label: string
}

interface CategoryOption {
  value: string
  label: string
}

interface SearchHeaderProps {
  ingredientOptions: IngredientOption[]
  cuisines: CuisineOption[]
  categories: CategoryOption[]
  selectedIngredients: string[]
  selectedCuisines: string[]
  selectedCategories: string[]
  handleIngredientChange: (selectedOptions: IngredientOption[]) => void
  handleCuisineChange: (selectedOption: CuisineOption | null) => void
  handleCategoryChange: (selectedOption: CategoryOption | null) => void
  handleClearParameters: () => void
}

// Custom component to display ingredient images in the dropdown
const Option = (props: any) => (
  <components.Option {...props}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src={props.data.image}
        alt={props.data.label}
        style={{ width: 30, marginRight: 10 }}
      />
      {props.data.label}
    </div>
  </components.Option>
)

const SearchHeader: React.FC<SearchHeaderProps> = ({
  ingredientOptions,
  cuisines,
  categories,
  selectedIngredients,
  selectedCuisines,
  selectedCategories,
  handleIngredientChange,
  handleCuisineChange,
  handleCategoryChange,

}) => {
  // Custom component to display ingredient images in the dropdown
  const Option = (props: any) => (
    <components.Option {...props}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={props.data.image}
          alt={props.data.label}
          style={{ width: 30, marginRight: 10 }}
        />
        {props.data.label}
      </div>
    </components.Option>
  )

  // Custom styles for react-select
  const selectStyles = {
    menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
  }

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: '400px' }}
    >
      <img
        src="/images/Meals-by-Chefkraft.png"
        alt="Various delicious meals"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
        <div className="container relative z-10 mx-auto p-8">
          <h2 className="mb-8 text-4xl font-bold text-white drop-shadow-lg">
            Select Cuisine and Add Your Ingredients
          </h2>

          <div className="mb-4 flex flex-wrap justify-center space-x-4">
            {/* Ingredients Selection with Search, Multi-select & Images */}
            <div>
              <h3 className="mb-2 text-xl font-bold text-white">
                Select Ingredients
              </h3>
              <Select
                options={ingredientOptions}
                onChange={handleIngredientChange}
                isClearable
                isMulti
                isSearchable
                placeholder="Search ingredients..."
                className="w-64 text-black"
                components={{ Option }}
                value={ingredientOptions.filter((option) =>
                  selectedIngredients.includes(option.value),
                )}
                menuPortalTarget={document.body}
                styles={selectStyles}
              />
            </div>

            {/* Cuisine Selection */}
            <div>
              <h3 className="mb-2 text-xl font-bold text-white">
                Select Cuisine
              </h3>
              <Select
                options={cuisines}
                onChange={handleCuisineChange}
                isClearable
                placeholder="Select Cuisine..."
                className="w-64 text-black"
                value={
                  selectedCuisines.length > 0
                    ? cuisines.find(
                        (option) => option.value === selectedCuisines[0],
                      )
                    : null
                }
                menuPortalTarget={document.body}
                styles={selectStyles}
              />
            </div>

            {/* Category Selection */}
            <div>
              <h3 className="mb-2 text-xl font-bold text-white">
                Select Category
              </h3>
              <Select
                options={categories}
                onChange={handleCategoryChange}
                isClearable
                placeholder="Select Category..."
                className="w-64 text-black"
                value={
                  selectedCategories.length > 0
                    ? categories.find(
                        (option) => option.value === selectedCategories[0],
                      )
                    : null
                }
                menuPortalTarget={document.body}
                styles={selectStyles}
              />
            </div>

            {/* Clear Parameters Button */}
            {/* <div className="flex items-end">
              <button
                onClick={handleClearParameters}
                className="mt-6 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600"
              >
                Clear Parameters
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchHeader
