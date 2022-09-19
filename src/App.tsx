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
  const [cart, setCart] = useState<Cart[]>(() => {
    const prevCart = localStorage.getItem('cart')
    return prevCart ? JSON.parse(prevCart) : []
  })

  // Call api and load in localStorage on load
  useEffect(() => {
    fetchMovies()
  }, [])

  // Update local storage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  async function fetchMovies() {
    const res = await fetch('/api/movie/all')
    const data = await res.json()
    setMovies(data)
  }

  async function updateCart(tickets: any[]) {
    let newCart: any = []

    for (let ticket of tickets) {
      // set ticket as unavailable
      const post = await fetch('/api/ticket/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: ticket.id, reserve: true }),
      })

      // update cart with ticket and movie information
      const res = await fetch(`/api/movie/searchShowing?id=${ticket.showingId}`)
      const [movie] = await res.json()
      newCart.push({ ticket, movie })
    }

    setCart(prev => {
      return [...prev, ...newCart]
    })

    alert('Selected tickets have been added to your cart!')
  }

  async function removeCartItem(id: number) {
    const post = await fetch('/api/ticket/reserve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, reserve: false }),
    })

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
