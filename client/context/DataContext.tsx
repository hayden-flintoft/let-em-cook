// client/context/DataContext.tsx
import { createContext } from 'react'

interface DataContextType {
  selectedIngredients: string[]
  setSelectedIngredients: React.Dispatch<React.SetStateAction<string[]>>
  selectedCategories: string[]
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>
  selectedCuisines: string[]
  setSelectedCuisines: React.Dispatch<React.SetStateAction<string[]>>
  recipes: any[] // Added recipes
  setRecipes: React.Dispatch<React.SetStateAction<any[]>> // Added setRecipes
}

export const DataContext = createContext<DataContextType | null>(null)
