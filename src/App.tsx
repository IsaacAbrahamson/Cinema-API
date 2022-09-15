import { useState, useEffect } from 'react'
import Navbar from './components/Nav'
import Header from './components/Header'
import Showings from './components/Showings'
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
    <div className="App">
      <Navbar />
      {movies.length > 0 && <>
        <Header movies={movies} />
        <Showings />
      </>}
      <Footer />
    </div>
  )
}

export default App
