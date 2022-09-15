import express from 'express'
import { findTickets, buyTicket } from '../Controllers/ticketController.js'
const router = express.Router()

router.get('/all', findTickets)
router.post('/buy', buyTicket)

export default router
