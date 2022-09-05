import express from 'express'
import { getShowings, getFavorites } from '../Controllers/movieController.js'
const router = express.Router()

router.get('/showings', getShowings)
router.get('/favorites', getFavorites)

export default router
