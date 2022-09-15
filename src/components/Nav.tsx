import Logo from '../assets/Logo.png'
import { ReactComponent as Cart } from '../assets/cart.svg'

function Navbar() {
  return (
    <nav>
      <img src={Logo} alt="3's Cinema" className='logo' />
      <div className="nav-links">
        <p className='nav--link'>Login</p>
        <Cart className='nav--icon' />
      </div>
    </nav>
  )
}

export default Navbar