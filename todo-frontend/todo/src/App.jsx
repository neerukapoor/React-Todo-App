import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css'
import Landing from './components/Landing';
import Login from './components/Login';
import Singup from './components/Signup';
import Navbar from './components/Navbar';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Navbar/>
        <Router>
          <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path='/signup' element={<Singup/>}/>
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
