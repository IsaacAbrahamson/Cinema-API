import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Showing from './components/Showing'
import Navbar from './components/Nav'
import Footer from './components/Footer'
import Cart from './components/Cart'
import './App.css'

interface Cart {
  ticket: {
    id: number,
    seat_col: number,
    seat_row: string,
    available: boolean
  }
  movie: any
}

function App() {
  const [movies, setMovies] = useState([])
  const [cart, setCart] = useState<Cart[]>([])

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
      const res = await fetch(`/api/movie/searchShowing?id=${ticket.showingId}`)
      const [movie] = await res.json()
      newCart.push({ ticket, movie })
    }

    // update cart
    setCart(prev => {
      return [...prev, ...newCart]
    })
  }

  function removeCartItem(id: number) {
    setCart(prev => {
      return prev.filter(obj => obj.ticket.id !== id)
    })
  }

  return (
    <div className='app'>
      <Navbar cart={cart} updateCart={updateCart} />
      <div id="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/showing/:id" element={<Showing cart={cart} updateCart={updateCart} />} />
          <Route path="/cart" element={<Cart cart={cart} updateCart={updateCart} removeCartItem={removeCartItem} />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
