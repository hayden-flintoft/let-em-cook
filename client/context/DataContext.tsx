import { MealListItem } from 'models/meals'
import React, { createContext, useState } from 'react'

interface DataContextProps {
  recipes: MealListItem[]
  setRecipes: React.Dispatch<React.SetStateAction<MealListItem[]>>
  // Add other shared state variables as needed
}

export const DataContext = createContext<DataContextProps | undefined>(
  undefined,
)

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [recipes, setRecipes] = useState<MealListItem[]>([])

  return (
    <DataContext.Provider value={{ recipes, setRecipes }}>
      {children}
    </DataContext.Provider>
  )
}
