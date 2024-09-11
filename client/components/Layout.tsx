import Header from './Header.tsx'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto flex-grow p-4">
        <Outlet />
      </main>
      <footer className="bg-gray-800 p-4 text-center text-white">
        © 2024 Letemcook. All rights reserved.
      </footer>
    </div>
  )
}
