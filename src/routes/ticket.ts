import express from 'express'
import Ticket from '../models/Ticket'
const router = express.Router()

// Given a showing ID, find any purchased tickets
// Route: /api/ticket/find?showingId=1
router.get('/find', async (req, res) => {
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
})

export default router
