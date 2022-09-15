import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Showing from './components/Showing'
import Navbar from './components/Nav'
import Footer from './components/Footer'
import Cart from './components/Cart'
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

  async function updateCart(tickets: any[]) {
    // get all movie data into cart
    let newCart: any = []
    for (let ticket of tickets) {
      const res = await fetch(`/api/movie/searchShowing?id=${ticket.id}`)
      const [data] = await res.json()
      newCart.push({ ticket, data })
    }

    // update cart
    setCart(prev => {
      return [...prev, ...newCart]
    })
  }

  return (
    <div className='app'>
      <Navbar cart={cart} updateCart={updateCart} />
      <div id="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/showing/:id" element={<Showing cart={cart} updateCart={updateCart} />} />
          <Route path="/cart" element={<Cart cart={cart} updateCart={updateCart} />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
