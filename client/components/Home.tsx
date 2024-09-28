// client/components/Home.tsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { carouselCategories, carouselCuisines } from '../../models/carouselData'
import { useFetchRecipes } from '@/hooks/useFetchRecipes'
import Carousel from './Carousel'
import RecipesList from './RecipesList'

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
    <div className="container mx-auto p-4 sm:p-8">
      {/* Carousel Section */}
      <div className="relative mb-8 h-[200px] w-full overflow-hidden rounded-3xl sm:h-[250px] md:h-[400px] lg:h-[500px]">
        <img
          src="/images/Meals-by-Chefkraft.png"
          alt="Various delicious meals"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-12">
            <h2 className="text-base font-bold text-white sm:text-xl md:text-3xl lg:text-5xl">
              &apos;I have nothing to eat&apos;,
              <br />
              <span className="text-accent">is just an unwritten recipe</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Carousel Component */}
      <section>
        <img
          className="mx-auto mb-10 mt-10 w-3/4 sm:w-1/2"
          src="/images/categories-cuisines.png"
          alt="Categories and Cuisines"
        />
        <div className="mb-5">
          <Carousel
            options={allOptions}
            selectedOption={selectedOption}
            onOptionSelect={handleOptionSelect}
            isCuisine={(option) => carouselCuisines.includes(option)}
            onRandomRecipeClick={fetchRandomRecipe} // Pass the function to Carousel
          />
        </div>
      </section>

      <section>
        {/* Recipes List Component */}
        <h3 className="mb-10 mt-20 text-center text-2xl font-bold text-[#9E3700] sm:text-3xl">
          {selectedOption} {isCuisine ? 'Cuisine' : 'Category'} Recipes
        </h3>
        {selectedOption && (
          <RecipesList
            recipes={recipes} // Ensure recipes contains strArea and strCategory
            isFetching={loading}
          />
        )}
      </section>
    </div>
  )
}
