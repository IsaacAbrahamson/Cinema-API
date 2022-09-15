import Logo from '../assets/Logo.png'

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-logo">
          <img src={Logo} alt="3's Cinema" />
        </div>
        <div className="footer-text">
          <h4 className='footer--header'>About</h4>
          <p className='footer--desc'>3's Cinema is a fake movie theater company created to serve as a brand for this app.</p>
          <a className='footer--link' href='#'>View in GitHub</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer