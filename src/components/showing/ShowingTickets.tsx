interface Props {
  tickets: any,
  updateTickets: Function
}

interface Ticket {
  seat_row: string,
  seat_col: number,
  available: boolean
}

function ShowingTickets(props: Props) {
  const ticketElems = props.tickets.map((ticket: Ticket) => {
    return (
      <div
        key={ticket.seat_row + ticket.seat_col}
        className={ticket.available ? "tickets--ticket" : "tickets--ticket reserved"}
      >
        {ticket.seat_row}{ticket.seat_col}
      </div>
    )
  })

  return (
    <div className="showing-tickets">
      <div className="showing-screen">Screen</div>
      <div className="tickets-container">
        {ticketElems}
      </div>
    </div>
  )
}

export default ShowingTickets