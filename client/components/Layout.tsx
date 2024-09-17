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
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto flex-grow p-4">
        {/* Pass the contextValue via the Outlet */}
        <Outlet context={contextValue} />
      </main>
      <footer className="bg-[#9E3700] p-10 text-center text-xl font-extrabold text-white">
        © 2024 Letemcook. All rights reserved.
      </footer>
    </div>
  )
}
