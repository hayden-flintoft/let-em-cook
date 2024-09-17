import { useState } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  // Define state variables
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])

  // Create a context value object
  const contextValue = {
    selectedIngredients,
    setSelectedIngredients,
    selectedCategories,
    setSelectedCategories,
    selectedCuisines,
    setSelectedCuisines,
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="container mx-auto flex-grow bg-slate-50 p-4">
        {/* Pass the contextValue via the Outlet */}
        <Outlet context={contextValue} />
      </main>
      <footer className="bg-gray-800 p-4 text-center text-white">
        © 2024 Letemcook. All rights reserved.
      </footer>
    </div>
  )
}
