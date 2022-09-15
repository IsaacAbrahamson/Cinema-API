import { Link } from "react-router-dom"
import Logo from '../assets/Logo.png'
import { ReactComponent as Cart } from '../assets/cart.svg'

function Navbar(props: any) {
  return (
    <nav>
      <Link to='/'>
        <img src={Logo} alt="3's Cinema" className='logo' />
      </Link>
      <div className="nav-links">
        <div className='nav--link'>Cart<Cart className='nav--icon' />
          {props.cart.length > 0 && <div className="cart--count">{props.cart.length}</div>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar