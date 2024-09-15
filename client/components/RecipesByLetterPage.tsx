import React, { useState, useEffect, useRef, useCallback } from 'react'
import RecipeListItem from '@/components/RecipeListItem'
import { useNavigate } from 'react-router-dom'

interface Recipe {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strCategory: string
  strArea: string
  strInstructions: string
  [key: string]: any
}

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

const RecipesByLetterPage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0)
  const [isFetching, setIsFetching] = useState(false)
  const [hasMoreLetters, setHasMoreLetters] = useState(true)

  const observer = useRef<IntersectionObserver | null>(null)

  const lastRecipeElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetching) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreLetters) {
          setCurrentLetterIndex((prevIndex) => prevIndex + 1)
        }
      })

      if (node) observer.current.observe(node)
    },
    [isFetching, hasMoreLetters],
  )

  const fetchRecipesByLetter = async (letter: string) => {
    setIsFetching(true)
    try {
      const response = await fetch(`/api/v1/meals/by-letter?letter=${letter}`)
      if (!response.ok) {
        throw new Error('Failed to fetch recipes')
      }
      const data = await response.json()
      const fetchedRecipes = data.meals || []
      setRecipes((prevRecipes) => [...prevRecipes, ...fetchedRecipes])
    } catch (error) {
      console.error('Error fetching recipes:', error)
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    if (currentLetterIndex < alphabet.length) {
      const letter = alphabet[currentLetterIndex]
      fetchRecipesByLetter(letter)
    } else {
      setHasMoreLetters(false)
    }
  }, [currentLetterIndex])

  return (
    <div className="container mx-auto p-8">
      <h2 className="mb-8 text-4xl font-bold text-black">Recipes A to Z</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe, index) => {
          if (index === recipes.length - 1) {
            return (
              <div key={recipe.idMeal} ref={lastRecipeElementRef}>
                <RecipeListItem recipe={recipe} layout="card" />
              </div>
            )
          } else {
            return (
              <div key={recipe.idMeal}>
                <RecipeListItem recipe={recipe} layout="card" />
              </div>
            )
          }
        })}
      </div>
      {isFetching && (
        <div className="mt-4 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-black"></div>
        </div>
      )}
    </div>
  )
}

export default RecipesByLetterPage
