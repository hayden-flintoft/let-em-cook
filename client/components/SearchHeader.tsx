// client/components/SearchHeader.tsx
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
    <div className="relative h-64 w-full overflow-hidden sm:h-80 md:h-96 lg:h-[30rem]">
      <img
        src="/images/toys1.png"
        alt="Various delicious meals"
        className="absolute inset-0 h-full w-full rounded-3xl object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 to-transparent">
        <div className="container relative z-10 mx-auto p-4 sm:p-8">
          {/* Optional Heading */}
          {/* <h2 className="mb-8 text-center text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            Filter for a Recipe!
          </h2> */}

          <div className="mb-4 flex flex-col items-center space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
            {/* Ingredients Selection with Search, Multi-select & Images */}
            <div className="w-full sm:w-auto">
              <h3 className="mb-2 text-center text-xl font-bold text-white sm:text-left">
                Select Ingredients
              </h3>
              <Select
                options={ingredientOptions}
                onChange={handleIngredientChange}
                isClearable
                isMulti
                isSearchable
                placeholder="Search ingredients..."
                className="w-full text-black sm:w-64"
                components={{ Option }}
                value={ingredientOptions.filter((option) =>
                  selectedIngredients.includes(option.value),
                )}
                menuPortalTarget={document.body}
                styles={selectStyles}
              />
            </div>

            {/* Cuisine Selection */}
            <div className="w-full sm:w-auto">
              <h3 className="mb-2 text-center text-xl font-bold text-white sm:text-left">
                Select Cuisine
              </h3>
              <Select
                options={cuisines}
                onChange={handleCuisineChange}
                isClearable
                placeholder="Select Cuisine..."
                className="w-full text-black sm:w-64"
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
            <div className="w-full sm:w-auto">
              <h3 className="mb-2 text-center text-xl font-bold text-white sm:text-left">
                Select Category
              </h3>
              <Select
                options={categories}
                onChange={handleCategoryChange}
                isClearable
                placeholder="Select Category..."
                className="w-full text-black sm:w-64"
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchHeader
