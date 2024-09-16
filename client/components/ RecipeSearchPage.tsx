// Client-side code (React components)

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

// Types (you can move these to a separate file)
interface Recipe {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strCategory: string
  strArea: string
  strInstructions: string
  [key: string]: any
}

interface SearchFilters {
  ingredients: string[]
  categories: string[]
  cuisines: string[]
  searchTerm: string
}

// SearchHeader component
const SearchHeader: React.FC<{
  filters: SearchFilters
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>
}> = ({ filters, setFilters }) => {
  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchTerm: e.target.value }))
  }

  return (
    <header className="mb-8">
      <input
        type="text"
        placeholder="Search recipes..."
        value={filters.searchTerm}
        onChange={handleSearchTermChange}
        className="w-full rounded-lg border p-2"
      />
      {/* Add more filter inputs (ingredients, categories, cuisines) here */}
    </header>
  )
}

// SearchResultList component
const SearchResultList: React.FC<{
  recipes: Recipe[]
  lastRecipeElementRef: (node: HTMLDivElement | null) => void
}> = ({ recipes, lastRecipeElementRef }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe, index) => (
        <div
          key={recipe.idMeal}
          ref={index === recipes.length - 1 ? lastRecipeElementRef : null}
        >
          <RecipeListItem recipe={recipe} layout="card" />
        </div>
      ))}
    </div>
  )
}

// SearchFooter component
const SearchFooter: React.FC<{ isFetching: boolean }> = ({ isFetching }) => {
  return (
    <footer className="mt-8">
      {isFetching && (
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-black"></div>
        </div>
      )}
    </footer>
  )
}

// Main SearchPage component
const SearchPage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [filters, setFilters] = useState<SearchFilters>({
    ingredients: [],
    categories: [],
    cuisines: [],
    searchTerm: '',
  })
  const [page, setPage] = useState(1)
  const [isFetching, setIsFetching] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const observer = useRef<IntersectionObserver | null>(null)
  const navigate = useNavigate()

  const lastRecipeElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetching) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prevPage => prevPage + 1)
        }
      })

      if (node) observer.current.observe(node)
    },
    [isFetching, hasMore]
  )

  const fetchRecipes = async () => {
    setIsFetching(true)
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        ...filters,
      })
      const response = await fetch(`/api/v1/recipes/search?${queryParams}`)
      if (!response.ok) {
        throw new Error('Failed to fetch recipes')
      }
      const data = await response.json()
      const fetchedRecipes = data.recipes || []
      setRecipes(prevRecipes => [...prevRecipes, ...fetchedRecipes])
      setHasMore(fetchedRecipes.length > 0)
    } catch (error) {
      console.error('Error fetching recipes:', error)
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    fetchRecipes()
  }, [page, filters])

  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-8 text-4xl font-bold">Recipe Search</h1>
      <SearchHeader filters={filters} setFilters={setFilters} />
      <SearchResultList recipes={recipes} lastRecipeElementRef={lastRecipeElementRef} />
      <SearchFooter isFetching={isFetching} />
    </div>
  )
}

export default SearchPage

// Server-side code (API routes)

import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

router.get('/api/v1/recipes/search', async (req, res) => {
  try {
    const { page = 1, searchTerm, ingredients, categories, cuisines } = req.query
    const pageSize = 20
    const skip = (Number(page) - 1) * pageSize

    const where = {
      AND: [
        searchTerm ? { strMeal: { contains: searchTerm as string, mode: 'insensitive' } } : {},
        ingredients ? { strIngredient1: { in: ingredients as string[] } } : {},
        categories ? { strCategory: { in: categories as string[] } } : {},
        cuisines ? { strArea: { in: cuisines as string[] } } : {},
      ],
    }

    const recipes = await prisma.recipe.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { strMeal: 'asc' },
    })

    res.json({ recipes })
  } catch (error) {
    console.error('Error searching recipes:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router