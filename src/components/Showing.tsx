import { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import ShowingInfo from './showing/ShowingInfo'
import ShowingTickets from './showing/ShowingTickets'
import { ReactComponent as Back } from '../assets/back.svg'
import './showing/ShowingStyles.css'

function Showing() {
  const params = useParams()
  const navigate = useNavigate()

  const [tickets, setTickets] = useState([])
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

  function updateTickets(ticketID: number) {
    console.log('ticketID', ticketID)
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
      {tickets && <ShowingTickets tickets={tickets} updateTickets={updateTickets} />}
    </div>
  )
}

export default Showing