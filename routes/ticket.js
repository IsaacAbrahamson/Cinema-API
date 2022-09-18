import express from 'express'
import { findTickets, buyTicket, reserveTicket } from '../Controllers/ticketController.js'
const router = express.Router()

router.get('/all', findTickets)
router.post('/buy', buyTicket)
router.post('/reserve', reserveTicket)

export default router
