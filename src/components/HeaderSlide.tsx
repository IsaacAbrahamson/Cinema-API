interface Props {
  title: String,
  desc: String,
  backdrop: String,
}

function HeaderSlide(props: Props) {
  return (
    <div className='header--slide'>
      <p>{props.title}</p>
      <p>{props.desc}</p>
      <p>{props.backdrop}</p>
    </div>
  )
}

export default HeaderSlide