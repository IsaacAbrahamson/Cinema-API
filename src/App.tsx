import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Showing from './components/Showing'
import Navbar from './components/Nav'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetchMovies()
  }, [])

  async function fetchMovies() {
    const res = await fetch('/api/movie/all')
    const data = await res.json()
    setMovies(data)
  }

  return (
    <div className='app'>
      <Navbar />
      <div id="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/showing:id" element={<Showing />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
