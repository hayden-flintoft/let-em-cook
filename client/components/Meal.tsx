import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function RecipePage() {
  const { id } = useParams<{ id: string }>() // Recipe ID from URL
  const [meal, setMeal] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [orderNote, setOrderNote] = useState('') // Store current order note
  const [comments, setComments] = useState<string[]>([]) // Store all comments

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

  const handleAddComment = () => {
    if (orderNote.trim()) {
      setComments([...comments, orderNote]) // Add current note to the list of comments
      setOrderNote('') // Clear the textarea
    }
  }

  const handleClearComment = () => {
    setOrderNote('') // Clear the textarea
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

                {/* Order notes box */}
                <div className="mt-6">
                  <label htmlFor="OrderNotes" className="sr-only">
                    Order notes
                  </label>
                  <div className="overflow-hidden">
                    <textarea
                      id="OrderNotes"
                      value={orderNote}
                      onChange={(e) => setOrderNote(e.target.value)} // Capture textarea input
                      className="w-full resize-none border-x-0 border-t-0 border-gray-200 px-0 align-top sm:text-sm"
                      rows="4"
                      placeholder="Enter any additional order notes..."
                    ></textarea>

                    <div className="flex items-center justify-end gap-2 py-3">
                      <button
                        type="button"
                        onClick={handleClearComment} // Clear textarea
                        className="rounded bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-600"
                      >
                        Clear
                      </button>

                      <button
                        type="button"
                        onClick={handleAddComment} // Add comment
                        className="rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                {/* Display comments */}
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-[#9E3700]">
                    Comments:
                  </h3>
                  <ul className="space-y-2">
                    {comments.map((comment, index) => (
                      <li key={index} className="rounded-lg bg-gray-100 p-2">
                        {comment}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
