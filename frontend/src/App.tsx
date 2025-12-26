import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import NotFound from './pages/NotFound'
import { Home } from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import { AuthRoute } from './routes/AuthRoute'
import { ProtectedRoute } from './routes/ProtectedRoute'

function App() {
  const router = createBrowserRouter([
    {
      path: "/home",
      element: <div>
        <Home />
      </div>
    },
    {
      path: "/products",
      element: <div>
        <Products />
      </div>
    },
    {
      path: "/cart",
      element: <div>
        <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
      </div>
    },
    {
      path: "/signup",
      element: <div>
        <AuthRoute>
          <SignUp />
        </AuthRoute>
      </div>
    },
    {
      path: "/login",
      element: <div>
        <AuthRoute>
          <Login />
        </AuthRoute>
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
