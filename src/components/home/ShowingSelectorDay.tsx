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
      onClick={() => props.handleClick(props.id, props.date)}
    >
      {props.name}
    </div>
  )
}

export default ShowingSelectorDay