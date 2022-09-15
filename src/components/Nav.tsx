import Logo from '../assets/Logo.png'
import Icon from '@mdi/react'
import { mdiCart } from '@mdi/js'

function Navbar() {
  return (
    <nav>
      <img src={Logo} alt="3's Cinema" className='logo' />
      <div className="nav-links">
        <p className='nav--link'>Login</p>
        <Icon path={mdiCart} title="View Cart" className='nav--icon' />
      </div>
    </nav>
  )
}

export default Navbar