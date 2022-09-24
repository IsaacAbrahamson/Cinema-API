import { Link } from "react-router-dom"
import Logo from '../assets/Logo.png'
import { ICart, ITicket } from '../types'
import { ReactComponent as Cart } from '../assets/cart.svg'

interface Props {
  cart: ICart[]
  updateCart: (tickets: ITicket[]) => Promise<void>
}

function Navbar(props: Props) {
  return (
    <nav>
      <Link to='/'>
        <img src={Logo} alt="3's Cinema" className='logo' />
      </Link>
      <div className="nav-links">
        <Link to='cart' className='nav--link'>Cart<Cart className='nav--icon' />
          {props.cart.length > 0 && <div className="cart--count">{props.cart.length}</div>}
        </Link>
      </div>
    </nav>
  )
}

export default Navbar