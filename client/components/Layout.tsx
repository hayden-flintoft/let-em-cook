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
      

<footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            
                <img src="/images/Letemcook.png" className="h-11" alt="Flowbite Logo" />
  
            
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://flowbite.com/" className="hover:underline">Let em Cook™</a>. All Rights Reserved.</span>
    </div>
</footer>


    </div>
  )
}
