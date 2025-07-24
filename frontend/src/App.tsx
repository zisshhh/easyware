import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { Signup } from './pages/Signup'
import { Home } from './pages/Home'


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/home" replace />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
