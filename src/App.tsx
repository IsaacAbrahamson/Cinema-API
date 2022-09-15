import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Showing from './components/Showing'
import Navbar from './components/Nav'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [movies, setMovies] = useState([])
  const [cart, setCart] = useState<any[]>([])

  useEffect(() => {
    fetchMovies()
  }, [])

  async function fetchMovies() {
    const res = await fetch('/api/movie/all')
    const data = await res.json()
    setMovies(data)
  }

  function updateCart(ids: any[]) {
    setCart(prev => {
      return [...prev, ...ids]
    })
  }

  return (
    <div className='app'>
      <Navbar cart={cart} updateCart={updateCart} />
      <div id="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/showing/:id" element={<Showing cart={cart} updateCart={updateCart} />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
