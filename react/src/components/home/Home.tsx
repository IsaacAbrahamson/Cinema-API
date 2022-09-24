import { useState, useEffect } from 'react'
import Header from './Header'
import Showings from './Showings'
import { IMovie } from '../../types'
import './HomeStyles.css'

function Home() {
  const [movies, setMovies] = useState<IMovie[]>([])

  useEffect(() => {
    fetchMovies()
  }, [])

  async function fetchMovies() {
    const res = await fetch('/api/movie/all')
    const data: IMovie[] = await res.json()
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
