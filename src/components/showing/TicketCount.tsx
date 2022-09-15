function TicketCount(props: any) {
  const ids = props.tickets.filter((ticket: any) => ticket.chosen)

  return (
    <div className="ticket-count">
      <div className="ticket--text">
        <h3 className='showing--header'>Select Tickets</h3>
        {ids.length === 0 ? <p>No tickets selected.</p> : <p>You have selected {ids.length} tickets</p>}
      </div>
      {ids.length > 0 && <div className="checkout-btn">Add to Cart</div>}
    </div>
  )
}

export default TicketCount