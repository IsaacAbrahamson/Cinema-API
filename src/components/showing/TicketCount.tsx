function TicketCount(props: any) {
  const chosenTickets = props.tickets.filter((ticket: any) => ticket.chosen)
  const ids = chosenTickets.map((e: any) => e.id)

  return (
    <div className="ticket-count">
      <div className="ticket--text">
        <h3 className='showing--header'>Select Tickets</h3>
        {ids.length === 0 ? <p>No tickets selected.</p> : <p>You have selected {ids.length} tickets</p>}
      </div>
      {ids.length > 0 && <div className="checkout-btn" onClick={() => { props.updateCart(ids) }}>Add to Cart</div>}
    </div>
  )
}

export default TicketCount