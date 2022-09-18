import { ReactComponent as Trash } from '../assets/delete.svg'

function Cart(props: any) {
  console.log(props.cart)

  let cartElems: any = []
  if (props.cart.length > 0) {
    cartElems = props.cart.map((e: any) => {
      console.log('e: ', e)
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

  return (
    <div className="cart">
      <h1 className="cart-title">Cart:</h1>
      <div className="cart-items">
        {props.cart.length == 0 && <p>You have no items in your cart!</p>}
        {props.cart.length > 0 && cartElems}
      </div>
    </div>
  )
}

export default Cart