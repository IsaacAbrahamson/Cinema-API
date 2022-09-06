import express from 'express'
import { findAll, findFavorites, findShowings } from '../Controllers/movieController.js'
const router = express.Router()

router.get('/all', findAll)
router.get('/favorites', findFavorites)
router.get('/showings', findShowings)

export default router
