interface Props {
  title: String,
  desc: String,
  backdrop: String,
}

function HeaderSlide(props: Props) {
  return (
    <div className='header-slide' style={{ backgroundImage: `url(${props.backdrop})` }}>
      <div className="header-overlay"></div>
      <div className="header-text">
        <p className="header--subtitle">now showing</p>
        <p className="header--title">{props.title}</p>
        <p className="header--desc">{props.desc}</p>
      </div>
    </div>
  )
}

export default HeaderSlide