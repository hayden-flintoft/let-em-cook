import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function RecipePage() {
  const { id } = useParams<{ id: string }>() // Recipe ID from URL
  const [meal, setMeal] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchMealById(id)
    }
  }, [id])

  const fetchMealById = async (mealId: string) => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`,
      )
      const data = await response.json()
      setMeal(data.meals[0])
    } catch (error) {
      console.error('Error fetching meal details:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>

  if (!meal) return <div>Recipe not found.</div>

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="shadow-neumorph hover:shadow-neumorph-pressed w-[60%] max-w-[1000px] p-4 shadow-lg">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#9E3700]">
            {meal.strMeal}
          </h2>
        </div>
        <div>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <img
                  src={meal.strMealThumb}
                  alt="food"
                  className="mx-auto w-[60%] object-cover"
                />
                <br />
                <p className="scroll-m-20 text-3xl font-extrabold tracking-tight text-[#9E3700]">
                  Step by step!
                </p>
                <br />
                <p className="text-l scroll-m-20 font-extrabold tracking-tight text-[#9E3700]">
                  {meal.strInstructions}
                </p>
                <br />
                <p className="scroll-m-20 text-3xl font-extrabold tracking-tight text-[#9E3700]">
                  Ingredients!
                </p>
                <div className="container mx-auto p-4">
                  {/* Map over ingredients */}
                  {Array.from({ length: 20 }, (_, index) => {
                    const ingredient = meal[`strIngredient${index + 1}`]
                    const measure = meal[`strMeasure${index + 1}`]

                    if (ingredient && ingredient.trim() !== '') {
                      return (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <input type="checkbox" className="mr-2" />
                          <p>
                            {measure} {ingredient}
                          </p>
                        </div>
                      )
                    }
                    return null
                  })}
                </div>
                <p className="scroll-m-20 text-3xl font-extrabold tracking-tight text-[#9E3700]">
                  Watch how to make it
                </p>
                <br />
                <div className="flex justify-center">
                  {meal.strYoutube && (
                    <iframe
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${meal.strYoutube.split('=')[1]}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-[60%] rounded-lg"
                    ></iframe>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
