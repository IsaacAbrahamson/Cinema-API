import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import Showing from './components/showing/Showing'
import Navbar from './components/Nav'
import Footer from './components/Footer'
import Cart from './components/cart/Cart'
import { ICart, ITicket, IShowing } from './types'
import './App.css'
import { buildURL } from './utils'

function App() {
  const [movies, setMovies] = useState([])
  const [cart, setCart] = useState<ICart[]>(() => {
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

  async function fetchMovies(): Promise<void> {
    const res = await fetch(buildURL('http://localhost:8080/api/movie/all'))
    const data = await res.json()
    setMovies(data)
  }

  async function clearCart(): Promise<void> {
    setCart([])
  }

  async function updateCart(tickets: ITicket[]): Promise<void> {
    let newCart: ICart[] = []

    for (let ticket of tickets) {
      // set ticket as active
      ticket.active = true
      ticket.chosen = false

      // update cart with ticket and movie information
      const res = await fetch(buildURL(`/api/movie/searchShowing?id=${ticket.showingId}`))
      const [showing]: IShowing[] = await res.json()
      newCart.push({ ticket, showing })
    }

    setCart(prev => {
      return [...prev, ...newCart]
    })

    alert('Selected tickets have been added to your cart!')
  }

  async function removeCartItem(showingId: number, seat: string): Promise<void> {
    const itemID: string = showingId + seat
    setCart(prevCart => {
      return prevCart.filter(prevCartItem => prevCartItem.ticket.showingId + prevCartItem.ticket.seat !== itemID)
    })
  }

  return (
    <div className='app'>
      <Navbar cart={cart} updateCart={updateCart} />
      <div id="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/showing/:id" element={<Showing cart={cart} updateCart={updateCart} />} />
          <Route path="/cart" element={<Cart cart={cart} updateCart={updateCart} removeCartItem={removeCartItem} clearCart={clearCart} />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
