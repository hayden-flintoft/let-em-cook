import {
  createRoutesFromElements,
  Route,
  createBrowserRouter,
} from 'react-router-dom'
// import App from './components/App.tsx'
import Home from './components/Home.tsx'
import Listingredients from './components/ListIngredients.tsx'

const routes = createRoutesFromElements(
  <Route path="/">
    <Route index element={<Home />} />
    <Route path="/ingredients" element={<Listingredients />} />
  </Route>,
)

const router = createBrowserRouter(routes)

export default router
