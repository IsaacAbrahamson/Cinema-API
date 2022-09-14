import { useState, useEffect } from 'react'
import Navbar from './components/Nav'
import Header from './components/Header'
import './App.css'

function App() {
  useEffect(() => {
    fetchMovies()
  }, [])

  async function fetchMovies() {
    const res = await fetch('/api/movie/all')
    const data = await res.json()
    console.log(data)
  }

  return (
    <div className="App">
      <Navbar />
      <Header />
    </div>
  )
}

export default App
