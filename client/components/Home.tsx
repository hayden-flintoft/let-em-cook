import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Home() {
  const popularCategories = [
    { name: 'French', imageUrl: 'images/French.png' },
    { name: 'Indian', imageUrl: '/images/Indian.png' },
    { name: 'Italian', imageUrl: 'images/Italian.png' },
    { name: 'Japanese', imageUrl: 'images/Japanese.png' },
    { name: 'Mexican', imageUrl: 'images/Mexican.png' },
    { name: 'Thai', imageUrl: 'images/Thai.png' },
  ]

  const placeholderCategories = [
    { name: 'Spanish', imageUrl: 'images/Spanish.png' },
    { name: 'Chinese', imageUrl: 'images/Chinese.png' },
    { name: 'Greek', imageUrl: 'images/Greek.png' },
    { name: 'Korean', imageUrl: 'images/Korean.png' },
    { name: 'Brazilian', imageUrl: 'images/Brazilian.png' },
    { name: 'Turkish', imageUrl: 'images/Turkish.png' },
  ]

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [recipes, setRecipes] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Fetch recipes when a category is selected
  useEffect(() => {
    // Select a random non-placeholder category on page load
    const randomCategory =
      popularCategories[Math.floor(Math.random() * popularCategories.length)]
    setSelectedCategory(randomCategory.name)
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      fetchRecipesByCategory(selectedCategory)
    }
  }, [selectedCategory])

  // Function to fetch recipes by category
  const fetchRecipesByCategory = async (category: string) => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${category}`,
      )
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

  const PopularCategory = ({ name, imageUrl }) => (
    <div
      className={`mx-4 flex min-w-[150px] cursor-pointer flex-col items-center ${
        name === selectedCategory ? 'border-b-4 border-yellow-500' : ''
      }`} // Add visual cue (underline) to selected category
      onClick={() => setSelectedCategory(name)}
    >
      <img
        src={imageUrl}
        alt={name}
        className={`mb-2 h-16 w-16 rounded-full object-cover ${
          name === selectedCategory ? 'ring-2 ring-yellow-500' : ''
        }`} // Add a ring effect around the selected category
      />
      <span
        className={`text-sm ${
          name === selectedCategory ? 'font-bold text-yellow-500' : ''
        }`} // Highlight the selected category text
      >
        {name}
      </span>
    </div>
  )

  // Scroll the carousel slowly
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += 1 // Adjust the speed as needed
        if (
          carouselRef.current.scrollLeft >=
          carouselRef.current.scrollWidth - carouselRef.current.clientWidth
        ) {
          carouselRef.current.scrollLeft = 0 // Loop back to the start
        }
      }
    }, 30) // Speed of the scroll

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

      {/* Popular Categories Carousel */}
      <section>
        <h3 className="mb-4 text-2xl font-semibold">Popular Categories</h3>
        <div
          ref={carouselRef}
          className="no-scrollbar flex overflow-x-auto whitespace-nowrap"
        >
          {popularCategories.map((category) => (
            <PopularCategory key={category.name} {...category} />
          ))}

          {/* Placeholder Categories */}
          {placeholderCategories.map((category) => (
            <PopularCategory key={category.name} {...category} />
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
      {selectedCategory && (
        <section>
          <h3 className="mb-4 mt-8 text-2xl font-semibold">
            {selectedCategory} Recipes
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
            <div>No recipes found for {selectedCategory}</div>
          )}
        </section>
      )}
    </div>
  )
}
