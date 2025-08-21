import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { Layout } from './components/layout'
import { Products } from './pages/Products'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Layout />}>
            <Route path='/home' element={<Home />} />
            <Route path="/products" element={<Products />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
