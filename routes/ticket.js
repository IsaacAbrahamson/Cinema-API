import express from 'express'
import { findTickets, buyTicket } from '../Controllers/ticketController.js'
const router = express.Router()

router.get('/find', findTickets)
router.post('/buy', buyTicket)

export default router
