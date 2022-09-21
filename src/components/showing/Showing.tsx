import { useState, useEffect, MouseEventHandler } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import ShowingInfo from './ShowingInfo'
import ShowingTickets from './ShowingTickets'
import TicketCount from './TicketCount'
import { ReactComponent as Back } from '../../assets/back.svg'
import './ShowingStyles.css'

interface Props {
  cart: any,
  updateCart: any
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

function Showing(props: Props) {
  // Get navigation for back button
  const navigate = useNavigate()

  // Get the showing ID from the route
  const params = useParams()
  const showingId: number = Number(params.id)

  // Initialize tickets state with dummy tickets
  const [tickets, setTickets] = useState<Ticket[]>(createEmptyTickets())
  const [showing, setShowing] = useState<{ [key: string]: any }>({})


  // Get reserved tickets and showing information on load
  useEffect(() => {
    callAPI()
  }, [])
  async function callAPI() {
    // Get any tickets that exist for the showing
    let ticketRes = await fetch(`/api/ticket/find?showingId=${showingId}`)
    let ticketData: Ticket[] = await ticketRes.json()

    // Update any tickets that come in from api to be reserved in state
    setTickets(prevTickets => {
      let newTickets: Ticket[] = [...prevTickets]
      for (let ticket of ticketData) {
        // find where ticket is in tickets array
        const existing: number = newTickets.findIndex(e => e.seat === ticket.seat)
        newTickets[existing].id = ticket.id
        newTickets[existing].reserved = true
      }
      return newTickets
    })

    // Get related movie data for showing
    let movieRes = await fetch(`/api/movie/searchShowing?id=${showingId}`)
    let movieData = await movieRes.json()
    setShowing(movieData[0])
  }


  function chooseTicket(ticket: Ticket) {
    setTickets(prevTickets => prevTickets.map(prevTicket => {
      // Do not update reserved seats
      if (ticket.reserved) return { ...prevTicket }
      // Toggle the active class for the chosen seat
      if (prevTicket.seat == ticket.seat) {
        return { ...prevTicket, active: !prevTicket.active }
      }
      return { ...prevTicket }
    }))
  }


  // Creates an array of ticket objects for state
  function createEmptyTickets(): Ticket[] {
    const rows: number = 10
    const cols: number = 16
    let seats: Ticket[] = []

    for (let row = 1; row <= rows; row++) {
      for (let col = 1; col <= cols; col++) {
        const letter = String.fromCharCode(row + 64)
        const seat = letter + col
        seats.push({
          showingId,
          seat,
          reserved: false,
          active: false,
          chosen: false
        })
      }
    }

    return seats
  }


  return (
    <div className='showing-container'>
      <div className='back-btn' onClick={() => navigate(-1)}><Back />Go Back</div>
      {showing.Movie && <ShowingInfo
        id={showing.id}
        time={showing.time}
        room={showing.room}
        title={showing.Movie.title}
        desc={showing.Movie.overview}
        trailer={showing.Movie.trailer}
        poster={showing.Movie.poster}
      />}
      {tickets && <TicketCount tickets={tickets} updateCart={props.updateCart} />}
      {tickets && <ShowingTickets tickets={tickets} chooseTicket={chooseTicket} />}
    </div>
  )
}

export default Showing