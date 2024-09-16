import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Home() {
  const categories = [
    'Beef',
    'Breakfast',
    'Chicken',
    'Dessert',
    'Goat',
    'Lamb',
    'Miscellaneous',
    'Pasta',
    'Pork',
    'Seafood',
    'Side',
    'Starter',
    'Vegan',
    'Vegetarian',
  ]

  const cuisines = [
    'American',
    'British',
    'Canadian',
    'Chinese',
    'Croatian',
    'Dutch',
    'Egyptian',
    'Filipino',
    'French',
    'Greek',
    'Indian',
    'Irish',
    'Italian',
    'Jamaican',
    'Japanese',
    'Kenyan',
    'Malaysian',
    'Mexican',
    'Moroccan',
    'Polish',
    'Portuguese',
    'Russian',
    'Spanish',
    'Thai',
    'Tunisian',
    'Turkish',
    'Ukrainian',
    'Unknown',
    'Vietnamese',
  ]

  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [recipes, setRecipes] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [isCuisine, setIsCuisine] = useState(false) // Track if selected is cuisine or category
  const carouselRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Create a combined array of categories and cuisines
  const allOptions = [...cuisines, ...categories]

  // Fetch recipes when a category or cuisine is selected
  useEffect(() => {
    const randomOption =
      allOptions[Math.floor(Math.random() * allOptions.length)]
    const isSelectedCuisine = cuisines.includes(randomOption)

    setSelectedOption(randomOption)
    setIsCuisine(isSelectedCuisine)
  }, [])

  useEffect(() => {
    if (selectedOption) {
      fetchRecipes(selectedOption, isCuisine)
    }
  }, [selectedOption, isCuisine])

  // Function to fetch recipes by category or cuisine
  const fetchRecipes = async (option: string, isCuisine: boolean) => {
    setLoading(true)
    try {
      const apiUrl = isCuisine
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?a=${option}` // Cuisine API
        : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${option}` // Category API

      const response = await fetch(apiUrl)
      const data = await response.json()
      setRecipes(data.meals || [])
    } catch (error) {
      console.error('Error fetching recipes:', error)
      setRecipes([])
    } finally {
      setLoading(false)
    }
  }

  // Fetch random recipe
  const fetchRandomRecipe = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/random.php',
      )
      const data = await response.json()
      const randomRecipeId = data.meals[0].idMeal
      navigate(`/recipe/${randomRecipeId}`) // Navigate to the random recipe page
    } catch (error) {
      console.error('Error fetching random recipe:', error)
    } finally {
      setLoading(false)
    }
  }

  const Option = ({
    name,
    type,
  }: {
    name: string
    type: 'category' | 'cuisine'
  }) => (
    <div
      className={`mx-4 flex min-w-[150px] cursor-pointer flex-col items-center ${
        name === selectedOption ? 'border-b-4 border-yellow-500' : ''
      }`} // Add visual cue (underline) to selected category/cuisine
      onClick={() => {
        setSelectedOption(name)
        setIsCuisine(type === 'cuisine')
      }}
    >
      <img
        src={`images/${name}.png`} // Image for each category/cuisine
        alt={name}
        className={`mb-2 h-16 w-16 rounded-full object-cover ${
          name === selectedOption ? 'ring-2 ring-yellow-500' : ''
        }`} // Add a ring effect around the selected option
      />
      <span
        className={`text-sm ${
          name === selectedOption ? 'font-bold text-yellow-500' : ''
        }`} // Highlight the selected option text
      >
        {name}
      </span>
    </div>
  )

  // Infinite scroll effect using a duplicated array
  const optionsList = [...allOptions, ...allOptions] // Duplicate the array

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += 1 // Adjust the speed as needed
        if (
          carouselRef.current.scrollLeft >=
          carouselRef.current.scrollWidth / 2 // When we reach the middle, jump back to the start
        ) {
          carouselRef.current.scrollLeft = 0 // Reset scroll to the beginning
        }
      }
    }, 1) // Speed of the scroll

    return () => clearInterval(scrollInterval) // Clean up the interval
  }, [])

  return (
    <div>
      <div>
        <div className="shadow-neumorph hover:shadow-neumorph-pressed active:shadow-neumorph-pressed relative mb-8 h-[500px] w-full overflow-hidden rounded-3xl">
          <img
            src="/images/Meals-by-Chefkraft.png"
            alt="Various delicious meals"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h2 className="text-4xl font-bold text-white drop-shadow-lg md:text-5xl lg:text-6xl">
                &apos;I have nothing to eat&apos;,
                <br />
                <span className="text-[#FFB649]">
                  is just an unwritten recipe
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Categories and Cuisines Carousel */}
      <section>
        <h3 className="mb-4 text-2xl font-semibold">Categories & Cuisines</h3>
        <div
          ref={carouselRef}
          className="no-scrollbar flex overflow-x-auto whitespace-nowrap"
        >
          {optionsList.map((option, index) => (
            <Option
              key={`${option}-${index}`} // Use both option and index to generate unique keys
              name={option}
              type={cuisines.includes(option) ? 'cuisine' : 'category'}
            />
          ))}

          {/* Random Recipe Option */}
          <div
            className="mx-4 flex min-w-[150px] cursor-pointer flex-col items-center"
            onClick={fetchRandomRecipe} // Trigger the random recipe fetch
          >
            <img
              src="/images/random.png" // You can use a specific image for random recipes
              alt="Random"
              className="mb-2 h-16 w-16 rounded-full object-cover"
            />
            <span className="text-sm">Random Recipe</span>
          </div>
        </div>
      </section>

      {/* Recipes List */}
      {selectedOption && (
        <section>
          <h3 className="mb-4 mt-8 text-2xl font-semibold">
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
                  className="shadow-neumorph hover:shadow-neumorph-pressed flex flex-col items-center rounded-lg p-4"
                >
                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="mb-2 h-32 w-32 rounded-full object-cover"
                  />
                  <span className="text-lg font-semibold">
                    {recipe.strMeal}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div>No recipes found for {selectedOption}</div>
          )}
        </section>
      )}
    </div>
  )
}
