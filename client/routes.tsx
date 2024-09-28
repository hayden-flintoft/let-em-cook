// client/routes.tsx
import { createRoutesFromElements, Route } from 'react-router-dom'
import Home from './components/Home.tsx'
import { createBrowserRouter } from 'react-router-dom'
import Meal from './components/Meal.tsx'
import Layout from './components/Layout.tsx'
import RecipesByLetterPage from './components/RecipesByLetterPage.tsx'
import User from './components/User.tsx'
import AboutUs from './components/About.tsx'
import ErrorBoundary from './components/ErrorBoundary' // Import the ErrorBoundary

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        index
        element={
          <ErrorBoundary>
            <Home />
          </ErrorBoundary>
        }
      />
      <Route
        path="/recipe/:id"
        element={
          <ErrorBoundary>
            <Meal />
          </ErrorBoundary>
        }
      />
      <Route
        path="/recipes-by-letter"
        element={
          <ErrorBoundary>
            <RecipesByLetterPage />
          </ErrorBoundary>
        }
      />
      <Route
        path="/search"
        element={
          <ErrorBoundary>
            <RecipesByLetterPage />
          </ErrorBoundary>
        }
      />
      <Route
        path="/userprofile"
        element={
          <ErrorBoundary>
            <User />
          </ErrorBoundary>
        }
      />
      <Route
        path="/about"
        element={
          <ErrorBoundary>
            <AboutUs />
          </ErrorBoundary>
        }
      />
    </Route>,
  ),
)

export default router
