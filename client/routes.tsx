import { createRoutesFromElements, Route } from 'react-router-dom'
import Home from './components/Home.tsx'
import { createBrowserRouter } from 'react-router-dom'
import Meal from './components/Meal.tsx'
import Layout from './components/Layout.tsx'
import App from './components/App.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/meal" element={<Meal />} />
      <Route path="/app" element={<App />} />
    </Route>,
  ),
)

export default router
