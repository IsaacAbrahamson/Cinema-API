import { MouseEventHandler, useState } from "react"

interface Props {
  tickets: any,
  updateTickets: any
}

interface Ticket {
  seat_row: string,
  seat_col: number,
  available: boolean,
  chosen: false,
  id: number
}

function ShowingTickets(props: Props) {
  const ticketElems = props.tickets.map((ticket: Ticket) => {
    let classname = 'tickets--ticket'
    if (!ticket.available) {
      classname += ' reserved'
    } else if (ticket.chosen) {
      classname += ' chosen'
    }

    return (
      <div
        key={ticket.id}
        className={classname}
        onClick={() => props.updateTickets(ticket.id)}
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