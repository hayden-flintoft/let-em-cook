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
  const { user } = useUser()

  useEffect(() => {
    if (id) {
      fetchMealById(id)
      fetchComments(id)
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

  const fetchComments = async (mealId: string) => {
    try {
      const response = await fetch(`/api/v1/comments/recipes/${mealId}`)
      const data = await response.json()
      setComments(data)
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  if (loading) return <div>Loading...</div>

  if (!meal) return <div>Recipe not found.</div>

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="shadow-neumorph hover:shadow-neumorph-pressed relative w-full max-w-4xl rounded-3xl p-6 md:p-10">
        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-primary">
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

          {/* Instructions */}
          <section>
            <h3 className="mb-2 text-2xl font-bold text-primary">
              Step by step!
            </h3>
            <p className="text-primary-light text-lg">{meal.strInstructions}</p>
          </section>

          {/* Ingredients List */}
          <section>
            <h3 className="mb-2 text-2xl font-bold text-primary">
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
                      <p className="text-primary-dark">
                        {measure} {ingredient}
                      </p>
                    </div>
                  )
                }
                return null
              })}
            </div>
          </section>

          {/* YouTube Video */}
          {meal.strYoutube && (
            <section>
              <h3 className="mb-2 text-2xl font-bold text-primary">
                Watch how to make it
              </h3>
              <div className="flex justify-center">
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${meal.strYoutube.split('=')[1]}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg md:w-[80%]"
                ></iframe>
              </div>
            </section>
          )}

          {/* Comments Section */}
          <section>
            <AddComment setComments={setComments} comments={comments} />
            <div className="mt-6">
              <h3 className="mb-2 text-xl font-bold text-primary">Comments:</h3>
              <ul className="space-y-2">
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <li key={index} className="rounded-lg bg-gray-100 p-2">
                      <p>
                        <strong>{comment.username}:</strong> {comment.comment}
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
