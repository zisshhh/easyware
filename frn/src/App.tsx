import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import NotFound from './pages/NotFound'

function App() {
  const router = createBrowserRouter([
    {
      path: "/signup",
      element: <div>
        <SignUp />
      </div>
    },
    {
      path: "/login",
      element: <div>
        <Login />
      </div>
    },
    {
      path: "*",
      element: <div>
        <NotFound />
      </div>
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
