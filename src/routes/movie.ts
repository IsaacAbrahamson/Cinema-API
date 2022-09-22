import express from 'express'
import { findAll, findFavorites, findShowings, searchMovie, searchShowing } from '../controllers/movieController'
const router = express.Router()

router.get('/all', findAll)
router.get('/favorites', findFavorites)
router.get('/showings', findShowings)
router.get('/searchMovie', searchMovie)
router.get('/searchShowing', searchShowing)

export default router
