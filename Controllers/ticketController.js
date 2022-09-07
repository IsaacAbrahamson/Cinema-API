import Ticket from '../models/Ticket.js'
import Showing from '../models/Showing.js'
import Movie from '../models/Movie.js'

// Example: /api/ticket/all?showingId=12
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

// Example: /api/ticket/buy?id=1&email=test@email.com&name=Test
export async function buyTicket(req, res) {
  // TODO: throw error if unavailable
  // TODO: use POST not GET
  // TODO: time in EST
  try {
    // Find and update ticket
    const ticket = await Ticket.findOne({
      where: {
        id: req.query.id
      }
    })
    ticket.email = req.query.email
    ticket.name = req.query.name
    ticket.available = false
    await ticket.save()

    // Get related showing info
    const showing = await Showing.findOne({
      where: {
        id: ticket.showingId
      }
    })

    // Get related movie info
    const movie = await Movie.findOne({
      where: {
        id: showing.MovieId
      }
    })

    res.json({
      movie: movie.title,
      room: showing.room,
      time: new Date(showing.time).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
      seat: ticket.seat_row + ticket.seat_col,
      name: ticket.name,
      id: ticket.id,
    })
  } catch (err) {
    console.log(err)
    res.json({ err: 'An error occured.' })
  }
}