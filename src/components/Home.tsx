import { useState, useEffect } from 'react'
import Header from './home/Header'
import Showings from './home/Showings'
import './home/HomeStyles.css'

function Home() {
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
    <div className="Home">
      {movies.length > 0 && <>
        <Header movies={movies} />
        <Showings />
      </>}
    </div>
  )
}

export default Home
