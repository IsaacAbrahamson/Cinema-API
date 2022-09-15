interface Props {
  id: number,
  title: String,
  desc: String,
  poster: String,
  backdrop: String,
  showings: Object[],
}

function ShowingItem(props: Props) {
  return (
    <div>
      {props.title}
    </div>
  )
}

export default ShowingItem