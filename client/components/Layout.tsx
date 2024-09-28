// client/components/Layout.tsx
import { useState } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import TestComponent from './TestComponent'

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
      <TestComponent />
      <main className="container mx-auto flex-grow p-4">
        {/* Pass the contextValue via the Outlet */}
        <Outlet context={contextValue} />
      </main>
      <footer className="m-4 rounded-lg bg-white shadow dark:bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
          <div className="flex flex-col items-center justify-between sm:flex-row">
            <img
              src="/images/Letemcook.png"
              className="mb-4 h-11 sm:mb-0"
              alt="Let em Cook Logo"
            />
            {/* Add any additional footer content here if needed */}
          </div>
          <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
          <span className="block text-center text-sm font-bold text-[#9E3700]">
            © 2024{' '}
            <a href="https://flowbite.com/" className="hover:underline">
              Let em Cook™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  )
}
