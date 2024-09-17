import { createRoutesFromElements, Route } from 'react-router-dom'
import Home from './components/Home.tsx'
import { createBrowserRouter } from 'react-router-dom'
import Meal from './components/Meal.tsx'
import Layout from './components/Layout.tsx'
import RecipesByLetterPage from './components/RecipesByLetterPage.tsx'
import User from './components/User.tsx'
import AboutUs from './components/About.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/recipe/:id" element={<Meal />} />
      <Route path="/recipes-by-letter" element={<RecipesByLetterPage />} />
      <Route path="/search" element={<RecipesByLetterPage />} />{' '}
      <Route path="/userprofile" element={<User />} />
      <Route path="/about" element={<AboutUs />} />
    </Route>,
  ),
)

export default router
