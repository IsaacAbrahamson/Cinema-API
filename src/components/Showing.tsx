import { useState, useEffect, MouseEventHandler } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import ShowingInfo from './showing/ShowingInfo'
import ShowingTickets from './showing/ShowingTickets'
import TicketCount from './showing/TicketCount'
import { ReactComponent as Back } from '../assets/back.svg'
import './showing/ShowingStyles.css'

interface Props {
  cart: any,
  updateCart: any
}

function Showing(props: Props) {
  const params = useParams()
  const navigate = useNavigate()

  const [tickets, setTickets] = useState<any[]>([])
  const [showing, setShowing] = useState<{ [key: string]: any }>({})

  useEffect(() => {
    callAPI()
  }, [])

  async function callAPI() {
    let ticketRes = await fetch(`/api/ticket/all?showingId=${params.id}`)
    let ticketData = await ticketRes.json()
    setTickets(ticketData)

    let movieRes = await fetch(`/api/movie/searchShowing?id=${params.id}`)
    let movieData = await movieRes.json()
    setShowing(movieData[0])
  }

  function updateTickets(e: any) {
    const id = e.target.getAttribute('data-id')
    // For every ticket
    setTickets(prev => prev.map(obj => {
      if (obj.id == id && obj.available) {
        return { ...obj, chosen: !obj.chosen }
      } else {
        return { ...obj }
      }

    }))
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
      {tickets && <TicketCount tickets={tickets} />}
      {tickets && <ShowingTickets tickets={tickets} updateCart={props.updateCart} updateTickets={updateTickets} />}
    </div>
  )
}

export default Showing