function Cart(props: any) {
  console.log(props.cart)

  return (
    <div className="cart">
      {props.cart.length == 0 && <p>You have no items in your cart!</p>}
    </div>
  )
}

export default Cart