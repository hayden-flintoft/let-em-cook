import { createRoutesFromElements, Route } from 'react-router-dom'
import Home from './components/Home.tsx'
import Login from './components/Login.tsx'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Route>,
  ),
)

export default router
