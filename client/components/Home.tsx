import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { carouselCategories, carouselCuisines } from '../../models/carouselData'
import { useFetchRecipes } from '@/hooks/useFetchRecipes'
import Carousel from './Carousel'
import RecipesList from './RecipesList'
import RandomRecipeButton from './RandomRecipeButton'

export default function Home() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isCuisine, setIsCuisine] = useState(false)
  const navigate = useNavigate()

  const allOptions = [...carouselCuisines, ...carouselCategories]

  // Select a random option when the page loads
  useEffect(() => {
    const randomOption =
      allOptions[Math.floor(Math.random() * allOptions.length)]
    const isSelectedCuisine = carouselCuisines.includes(randomOption)

    setSelectedOption(randomOption)
    setIsCuisine(isSelectedCuisine)
  }, [])

  // Use the custom hook to fetch recipes based on the selected option
  const { recipes, loading } = useFetchRecipes(selectedOption || '', isCuisine)

  const handleOptionSelect = (option: string, type: 'category' | 'cuisine') => {
    setSelectedOption(option)
    setIsCuisine(type === 'cuisine')
  }

  // Fetch a random recipe and navigate to its page
  const fetchRandomRecipe = async () => {
    try {
      const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/random.php',
      )
      const data = await response.json()
      const randomRecipeId = data.meals[0].idMeal
      navigate(`/recipe/${randomRecipeId}`) // Navigate to the random recipe page
    } catch (error) {
      console.error('Error fetching random recipe:', error)
    }
  }

  return (
    <div>
      {/* Carousel Section */}
      <div className="shadow-neumorph hover:shadow-neumorph-pressed relative mb-8 h-[500px] w-full overflow-hidden rounded-3xl">
        <img
          src="/images/Meals-by-Chefkraft.png"
          alt="Various delicious meals"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h2 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              &apos;I have nothing to eat&apos;,
              <br />
              <span className="text-[#FFB649]">
                is just an unwritten recipe
              </span>
            </h2>
          </div>
        </div>
      </div>

      {/* Carousel Component */}
      <section>
        <h3 className="mb-4 text-2xl font-semibold">Categories & Cuisines</h3>
        <Carousel
          options={allOptions}
          selectedOption={selectedOption}
          onOptionSelect={handleOptionSelect}
          isCuisine={(option) => carouselCuisines.includes(option)}
        />
        <RandomRecipeButton onClick={fetchRandomRecipe} />
      </section>

      {/* Recipes List Component */}
      {selectedOption && (
        <RecipesList
          recipes={recipes}
          loading={loading}
          selectedOption={selectedOption}
          isCuisine={isCuisine}
        />
      )}
    </div>
  )
}
