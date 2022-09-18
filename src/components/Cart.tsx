import Checkout from './Checkout'
import { useState } from 'react'
import { ReactComponent as Trash } from '../assets/delete.svg'

interface Contact {
  name?: string,
  email?: string
}

function Cart(props: any) {
  const [contact, setContact] = useState<Contact>({})

  let cartElems: any = []
  if (props.cart.length > 0) {
    cartElems = props.cart.map((e: any) => {
      return (
        <div className="cart-item" key={e.ticket.id}>
          <div className="cart-item-poster">
            <img src={e.movie.Movie.poster} alt={e.movie.Movie.title + ' poster'} />
          </div>
          <div className="cart-item-details">
            <h2 className="cart-item--title">{e.movie.Movie.title}</h2>
            <p className="cart-item--text"><span>Time:</span> {e.movie.time}</p>
            <p className="cart-item--text"><span>Room:</span> {e.movie.room}</p>
            <p className="cart-item--text"><span>Seat:</span> {e.ticket.seat_row}{e.ticket.seat_col}</p>
          </div>
          <div className="cart-remove" onClick={() => props.removeCartItem(e.ticket.id)}>Delete <Trash /></div>
        </div>
      )
    })
  }

  function updateContact(e: any) {

  }

  return (
    <div className="cart">

      <h1 className="cart-title">Cart:</h1>
      <div className="cart-items">
        {props.cart.length == 0 && <p>You have no items in your cart!</p>}
        {props.cart.length > 0 && cartElems}
      </div>

      {props.cart.length > 0 && <Checkout cart={props.cart} />}

    </div >
  )
}

export default Cart