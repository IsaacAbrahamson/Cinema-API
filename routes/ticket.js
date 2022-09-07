import express from 'express'
import { findTickets, buyTicket } from '../Controllers/ticketController.js'
const router = express.Router()

router.get('/all', findTickets)
router.get('/buy', buyTicket)

export default router
