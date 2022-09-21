import Ticket from '../models/Ticket.js'
import Showing from '../models/Showing.js'
import Movie from '../models/Movie.js'
import TicketHistory from '../models/TicketHistory.js'

// Given a showing ID, find any purchased tickets
// Route: /api/ticket/find?showingId=1
export async function findTickets(req, res) {
  try {
    const tickets = await Ticket.findAll({
      where: {
        showingId: req.query.showingId
      }
    })
    res.json(tickets)
  } catch (err) {
    console.log(err)
    res.json({ err: 'An error occured.' })
  }
}



// Given a showing ID and seat, create a Ticket and TicketHistory item
// Route: /api/ticket/buy { showingId: 4, seat: "A10" }
export async function buyTicket(req, res) {
  try {
    // ensure ticket doesn't exist
    const existingTicket = await Ticket.findOne({
      where: {
        showingId: req.body.showingId,
        seat: req.body.seat
      }
    })
    if (existingTicket) return res.status(400).send('Ticket already exists')

    // Update ticket
    const ticket = Ticket.create({
      showingId: req.body.showingId,
      seat: req.body.seat
    })

    // Save copy of ticket in TicketHistory
    const info = await getFullMovieInfo(req.body.showingId)
    const archivedTicket = await TicketHistory.create({
      seat: req.body.seat,
      name: info.movie.title,
      poster: info.movie.poster,
      time: info.showing.time,
      room: info.showing.room
    })
    res.send({ id: archivedTicket.id })
  } catch (err) {
    console.log(err)
    res.json({ err: 'An error occured.' })
  }
}


// Gets full showing and movie info given a showing ID
async function getFullMovieInfo(showingId) {
  const showing = await Showing.findOne({
    where: {
      id: showingId
    }
  })

  const movie = await Movie.findOne({
    where: {
      id: showing.MovieId
    }
  })

  return { showing, movie }
}