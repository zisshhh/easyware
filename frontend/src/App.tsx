import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import NotFound from './pages/NotFound'
import { Home } from './pages/Home'

function App() {
  const router = createBrowserRouter([
    {
      path: "/home",
      element: <div>
        <Home />
      </div>
    },
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
