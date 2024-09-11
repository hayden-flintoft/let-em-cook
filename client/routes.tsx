import { createRoutesFromElements, Route } from 'react-router-dom'
import Home from './components/Home.tsx'
import Login from './components/Login.tsx'
import { createBrowserRouter } from 'react-router-dom'
import Meal from './components/Meal.tsx'
import Layout from './components/Layout.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/meal" element={<Meal />} />
      <Route path="/login" element={<Login />} />
    </Route>,
  ),
)

export default router
