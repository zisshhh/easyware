import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Appbar } from './components/Appbar'
import { Signup } from './pages/Signup'


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Appbar />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
