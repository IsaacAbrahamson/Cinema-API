import express from 'express'
import { findAll, findFavorites, findShowings, search } from '../Controllers/movieController.js'
const router = express.Router()

router.get('/all', findAll)
router.get('/favorites', findFavorites)
router.get('/showings', findShowings)
router.get('/search', search)

export default router
