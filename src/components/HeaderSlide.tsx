import { useEffect, useState } from 'react'

interface Props {
  title: String,
  desc: String,
  backdrop: String,
}

function HeaderSlide(props: Props) {
  const [offset, setOffset] = useState(window.scrollY)

  function updateOffset() {
    setOffset(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', updateOffset)
    return (() => {
      window.removeEventListener('scroll', updateOffset)
    })
  }, [])

  return (
    <div className='header-slide' style={{ backgroundImage: `url(${props.backdrop})`, backgroundPositionY: `${offset * 0.7}px` }}>
      <div className="header-overlay"></div>
      <div className="header-text" style={{ transform: `translateY(${offset * -0.7}px)` }}>
        <p className="header--subtitle">now showing</p>
        <p className="header--title">{props.title}</p>
        <p className="header--desc">{props.desc}</p>
        <div className='header--ticketBtn'>Get Tickets</div>
      </div>
    </div>
  )
}

export default HeaderSlide