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


// Example: /api/ticket/reserve
export async function reserveTicket(req, res) {
  try {
    // Find and update ticket
    const ticket = await Ticket.findOne({
      where: {
        id: req.body.id
      }
    })

    // Set ticket unavailable
    ticket.available = !req.body.reserve
    await ticket.save()

    res.json({
      id: ticket.id,
      status: 'changed status'
    })
  } catch (err) {
    console.log(err)
    res.json({ err: 'An error occured.' })
  }
}



// Example: /api/ticket/buy
export async function buyTicket(req, res) {
  try {
    // Find and update ticket
    const ticket = await Ticket.findOne({
      where: {
        id: req.body.id
      }
    })

    // Ensure ticket is available
    if (!ticket.available) {
      res.json({ err: 'Selected ticket is unavailable' })
      return
    }

    ticket.email = req.body.email
    ticket.name = req.body.name
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
      apiID: movie.apiID,
      room: showing.room,
      time: showing.time,
      seat: ticket.seat_row + ticket.seat_col,
      name: ticket.name,
      id: ticket.id,
    })
  } catch (err) {
    console.log(err)
    res.json({ err: 'An error occured.' })
  }
}