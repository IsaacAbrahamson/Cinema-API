import Ticket from '../models/Ticket.js'
import Showing from '../models/Showing.js'
import Movie from '../models/Movie.js'
import TicketHistory from '../models/TicketHistory.js'
import Order from '../models/Order.js'

/* Given a user nad list of showing IDs and seats, create an Order with relevant Ticket and TicketHistory item
POST /api/order/new
{
    "user": 1,
    "cart": [
        {
            "showing": 1,
            "seat": "A1"
        },
        {
            "showing": 1,
            "seat": "A2"
        }
    ]
}
*/
export async function placeOrder(req: any, res: any) {
  // Ensure that chosen tickets don't already exist
  for (let ticket of req.body.cart) {
    const existingTicket = await Ticket.findOne({
      where: {
        showingId: ticket.showing,
        seat: ticket.seat
      }
    })
    if (existingTicket) return res.status(400).send({
      err: 'Ticket already exists',
      showingId: ticket.showing,
      seat: ticket.seat
    })
  }

  // Create order
  const order: any = await Order.create({ date: Date.now().toString(), UserId: req.body.user })
  // Create tickets and associate them with order
  for (let ticket of req.body.cart) {
    await buyTicket(order.id, ticket.showing, ticket.seat)
  }

  res.send({ order: order.id })
}



// Given an order, showing, and seat create the Ticket and TicketHistory items for that order
async function buyTicket(OrderId: any, showingId: any, seat: any) {
  // Create ticket
  Ticket.create({ showingId, seat })

  // Save copy of ticket in TicketHistory
  const info: any = await getFullMovieInfo(showingId)
  const archivedTicket: any = await TicketHistory.create({
    name: info.movie.title,
    poster: info.movie.poster,
    time: info.showing.time,
    room: info.showing.room,
    seat,
    OrderId
  })
  return archivedTicket.id
}


// Gets full showing and movie info given a showing ID
async function getFullMovieInfo(showingId: any) {
  const showing: any = await Showing.findOne({
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