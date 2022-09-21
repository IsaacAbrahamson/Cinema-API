import { MouseEventHandler, useState } from "react"

interface Props {
  tickets: Ticket[],
  chooseTicket: (ticket: Ticket) => void
}

// Reserved tickets are tickets that are stored in the database
// Active tickets are currently in the cart
// Chosen tickets are selected but not added to cart
interface Ticket {
  showingId: number,
  seat: string,
  reserved: boolean,
  active: boolean,
  chosen: boolean
  id?: number,
}

function ShowingTickets(props: Props) {
  const ticketElems = props.tickets.map((ticket: Ticket) => {
    let classname = 'tickets--ticket'
    if (ticket.reserved) {
      classname += ' reserved'
    } else if (ticket.active) {
      classname += ' active'
    }

    return (
      <div
        key={ticket.seat}
        className={classname}
        onClick={() => props.chooseTicket(ticket)}
      >
        {ticket.seat}
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