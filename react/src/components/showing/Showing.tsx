import { useState, useEffect, MouseEventHandler } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import ShowingInfo from './ShowingInfo'
import ShowingTickets from './ShowingTickets'
import TicketCount from './TicketCount'
import { ReactComponent as Back } from '../../assets/back.svg'
import { ICart, ITicket, IShowing } from '../../types'
import './ShowingStyles.css'
import { buildURL } from '../../utils'

interface Props {
  cart: ICart[],
  updateCart: (tickets: ITicket[]) => void
}

function Showing(props: Props) {
  // Get navigation for back button
  const navigate = useNavigate()

  // Get the showing ID from the route
  const params = useParams()
  const showingId: number = Number(params.id)

  // Initialize tickets state with dummy tickets
  const [tickets, setTickets] = useState<ITicket[]>(createEmptyTickets())
  const [showing, setShowing] = useState<IShowing | {}>({})


  // Keep tickets state up-to-date with cart
  useEffect(() => {
    for (let { ticket } of props.cart) {
      if (ticket.showingId !== showingId) return

      // Update any tickets that come in from cart to active state
      setTickets(prevTickets => {
        let newTickets: ITicket[] = [...prevTickets]

        // Find where seats amtch
        const existing: number = newTickets.findIndex(e => e.seat === ticket.seat)
        newTickets[existing].id = ticket.id
        newTickets[existing].active = true
        return newTickets
      })
    }
  }, [props.cart])


  // Get reserved tickets and showing information on load
  useEffect(() => {
    callAPI()
  }, [])
  async function callAPI(): Promise<void> {
    // Get any tickets that exist for the showing
    let ticketRes = await fetch(buildURL(`/api/ticket/find?showingId=${showingId}`))
    let ticketData: ITicket[] = await ticketRes.json()

    // Update any tickets that come in from api to be reserved in state
    setTickets(prevTickets => {
      let newTickets: ITicket[] = [...prevTickets]
      for (let ticket of ticketData) {
        // find where ticket is in tickets array
        const existing: number = newTickets.findIndex(e => e.seat === ticket.seat)
        newTickets[existing].id = ticket.id
        newTickets[existing].reserved = true
      }
      return newTickets
    })

    // Get related movie data for showing
    let movieRes = await fetch(buildURL(`/api/movie/searchShowing?id=${showingId}`))
    let movieData = await movieRes.json()
    setShowing(movieData.at(0) ?? {})
  }


  function chooseTicket(ticket: ITicket): void {
    setTickets(prevTickets => prevTickets.map(prevTicket => {
      // Do not update reserved or active seats
      if (ticket.reserved || ticket.active) return { ...prevTicket }
      // Toggle the active class for the chosen seat
      if (prevTicket.seat == ticket.seat) {
        return { ...prevTicket, chosen: !prevTicket.chosen }
      }
      return { ...prevTicket }
    }))
  }


  // Creates an array of ticket objects for state
  function createEmptyTickets(): ITicket[] {
    const rows: number = 10
    const cols: number = 16
    let seats: ITicket[] = []

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


  // User Defined Type Guard for showing
  function instanceOfShowing(obj: IShowing | {}): obj is IShowing {
    return 'Movie' in obj;
  }


  return (
    <div className='showing-container'>
      <div className='back-btn' onClick={() => navigate(-1)}><Back />Go Back</div>
      {instanceOfShowing(showing) && <ShowingInfo
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