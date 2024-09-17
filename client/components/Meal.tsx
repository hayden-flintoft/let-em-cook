import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddComment from './CommentForm'
import { useUser } from '@clerk/clerk-react'
import { Comment } from 'models/comments'
import Like from './LikeButton'

export default function RecipePage() {
  const { id } = useParams<{ id: string }>()
  const [meal, setMeal] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState<Comment[]>([])
  const [showVideo, setShowVideo] = useState(false) // Start with video hidden
  const { user } = useUser()

  useEffect(() => {
    if (id) {
      fetchMealById(id)
      fetchComments(id)
    }
  }, [id])

  // Fetch meal by ID
  const fetchMealById = async (mealId: string) => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`,
      )
      const data = await response.json()
      const mealData = data.meals[0]
      setMeal(mealData)

      // Check if YouTube video is available after meal is set
      if (mealData.strYoutube) {
        checkVideoAvailability(mealData.strYoutube.split('=')[1]) // Extract YouTube video ID
      }
    } catch (error) {
      console.error('Error fetching meal details:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchComments = async (mealId: string) => {
    try {
      const response = await fetch(`/api/v1/comments/recipes/${mealId}`)
      const data = await response.json()
      setComments(data)
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  // Check YouTube video availability
  const checkVideoAvailability = async (videoId: string) => {
    try {
      const response = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
      )
      if (response.ok) {
        setShowVideo(true) // Only show video if it's available
      }
    } catch (error) {
      console.error('Error checking YouTube video availability:', error)
      setShowVideo(false) // In case of any error, hide the video
    }
  }

  if (loading) return <div>Loading...</div>

  if (!meal) return <div>Recipe not found.</div>

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="shadow-neumorph relative w-full max-w-4xl rounded-3xl md:p-10">
        <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-[#9E3700]">
          {meal.strMeal}
        </h2>

        <Like recipeId={id} />

        <div className="grid gap-6">
          {/* Meal Image */}
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="mx-auto w-[100%] rounded-3xl object-cover md:w-[70%] lg:w-[60%]"
          />
          {/* Ingredients List */}
          <section>
            <h3 className="mb-5 mt-10 text-2xl font-bold text-[#9E3700]">
              Ingredients!
            </h3>
            <div className="container mx-auto p-4">
              {Array.from({ length: 20 }, (_, index) => {
                const ingredient = meal[`strIngredient${index + 1}`]
                const measure = meal[`strMeasure${index + 1}`]
                if (ingredient && ingredient.trim() !== '') {
                  return (
                    <div
                      key={index}
                      className="mb-2 flex items-center space-x-2"
                    >
                      <input type="checkbox" className="mr-2" />
                      <p className="text-primary-dark text-lg font-semibold">
                        {measure} {ingredient}
                      </p>
                    </div>
                  )
                }
                return null
              })}
            </div>
          </section>
          {/* Instructions */}
          <section>
            <h3 className="mb-5 text-2xl font-bold text-[#9E3700]">
              Step by step!
            </h3>
            <p className="text-primary-light text-lg">{meal.strInstructions}</p>
          </section>

          {/* Conditionally render the heading and video */}
          {meal.strYoutube && showVideo && (
            <>
              <p className="scroll-m-20 text-3xl font-extrabold tracking-tight text-[#9E3700]">
                Watch how to make it
              </p>
              <br />
              <div className="flex justify-center">
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${meal.strYoutube.split('=')[1]}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-[60%] rounded-lg"
                ></iframe>
              </div>
            </>
          )}

          {/* Comments Section */}
          <section>
            <AddComment setComments={setComments} comments={comments} />
            <div className="mt-6">
              <h3 className="mb-2 text-xl font-bold text-[#9E3700]">
                Comments:
              </h3>
              <ul className="space-y-2">
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <li key={index} className="rounded-lg bg-gray-100 p-2">
                      <p>
                        <strong className="text-[#9E3700]">
                          {comment.username}:
                        </strong>{' '}
                        {comment.comment}
                      </p>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">
                    No comments yet. Be the first to comment!
                  </p>
                )}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
