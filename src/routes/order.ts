import express from 'express'
import { placeOrder } from '../controllers/orderController.js'
const router = express.Router()

// Given a showing ID, find any purchased tickets
// Route: /api/order/new
router.post('/new', placeOrder)

export default router
