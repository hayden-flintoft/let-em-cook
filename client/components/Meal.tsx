import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Heart } from 'lucide-react'
import AddComment from './CommentForm'
import { useUser } from '@clerk/clerk-react'

export default function RecipePage() {
  const { id } = useParams<{ id: string }>()
  const [meal, setMeal] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState<string[]>([])
  const [liked, setLiked] = useState(false)
  const [heartCount, setHeartCount] = useState(0)
  const {user} = useUser()

  useEffect(() => {
    if (id) {
      fetchMealById(id)
      fetchLikeStatus(id)
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

  const fetchLikeStatus = async (mealId: string) => {
    try {
      const response = await fetch(`/api/likes/${mealId}`)
      const data = await response.json()
      setLiked(data.isLiked)
      setHeartCount(data.likeCount)
    } catch (error) {
      console.error('Error fetching like status:', error)
    }
  }

  const fetchComments = async (mealId: string) => {
    try {
      const response = await fetch(`/api/comments/${mealId}`)
      const data = await response.json()
      setComments(data.comments)
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  const handleToggleLike = async () => {
    try {
      const response = await fetch(`/api/likes/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isLiked: !liked }),
      })
      const data = await response.json()
      setLiked(data.isLiked)
      setHeartCount(data.likeCount)
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  if (loading) return <div>Loading...</div>

  if (!meal) return <div>Recipe not found.</div>

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="shadow-neumorph hover:shadow-neumorph-pressed relative w-[60%] max-w-[1000px] rounded-3xl p-20 shadow-lg">
        <button
          onClick={handleToggleLike}
          className={`absolute right-4 top-4 rounded-full p-2 ${liked ? 'text-red-500' : 'text-gray-500'} transition-colors hover:text-red-700`}
        >
          <Heart className="h-12 w-12" />
        </button>
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#9E3700]">
            {meal.strMeal}
          </h2>
          <br />
        </div>
        <div>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <img
                src={meal.strMealThumb}
                alt="food"
                className="mx-auto w-[60%] rounded-3xl object-cover"
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
                {Array.from({ length: 20 }, (_, index) => {
                  const ingredient = meal[`strIngredient${index + 1}`]
                  const measure = meal[`strMeasure${index + 1}`]

                  if (ingredient && ingredient.trim() !== '') {
                    return (
                      <div key={index} className="flex items-center space-x-2">
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
              <br />
              <br />
              {/* Pass setComments and comments to AddComment */}
              <AddComment setComments={setComments} comments={comments} />
              <div className="mt-6">
                <div className="overflow-hidden">
                  <h3 className="text-xl font-bold text-[#9E3700]">Comments:</h3>
                  <ul className="space-y-2">
                    {comments.map((comment, index) => (
                      <li key={index} className="rounded-lg bg-gray-100 p-2">{user?.fullName}:  
                         {comment}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
