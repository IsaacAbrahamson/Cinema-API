import OrderSummary from './OrderSummary'

function Checkout(props: any) {
  return (
    <div className="checkout">
      <h2 className="checkout-title">Order Summary:</h2>
      <OrderSummary count={props.cart.length} />

      <div className='checkout-form'>
        <h2 className="checkout-title">Personal Information:</h2>
        <label className='checkout--label'>
          Name:
          <input type="text" name="name" placeholder='Full Name' />
        </label>
        <label className='checkout--label'>
          Email:
          <input type="text" name="email" placeholder='john.doe@gmail.com' />
        </label>

        <h2 className="checkout-title">Payment Details:</h2>
        <p className='checkout--warning'><span>Note:</span> Payment section is for appearance only, no payment details are collected.</p>
        <label className='checkout--label'>
          Card Number:
          <input type="text" name="cardNumber" placeholder='9999-9999-9999-9999' />
        </label>
        <div className="form-group">
          <label className='checkout--label'>
            Security Code:
            <input type="text" name="secCode" placeholder='***' />
          </label>
          <label className='checkout--label'>
            Expiration Date:
            <input type="text" name="expDate" placeholder='MM/YY' />
          </label>
        </div>

        <div className="checkout-btn">checkout</div>
      </div>
    </div>
  )
}

export default Checkout