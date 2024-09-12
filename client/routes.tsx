import { createRoutesFromElements, Route } from 'react-router-dom'
import Home from './components/Home.tsx'
import { createBrowserRouter } from 'react-router-dom'
import Meal from './components/Meal.tsx'
import Layout from './components/Layout.tsx'
// import FindRecipe from './components/FindRecipe.tsx'
// import { CollapsibleDemo } from './components/Collapsible.tsx'
import SearchPage from './components/SearchPage.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/meal" element={<Meal />} />
      {/* <Route path="/recipe" element={<FindRecipe />} /> */}
      <Route path="/searchpage" element={<SearchPage />} />
    </Route>,
  ),
)

export default router
