interface Props {
  id: number
  active: boolean
  handleClick: any
  name: string
  date: string
}

function ShowingSelectorDay(props: Props) {
  return (
    <div
      className={props.active ? "selector-day active" : "selector-day"}
      onClick={props.handleClick}
      data-id={props.id}
      data-date={props.date}
    >
      {props.name}
    </div>
  )
}

export default ShowingSelectorDay