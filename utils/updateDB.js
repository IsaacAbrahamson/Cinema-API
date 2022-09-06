// Updates database with latest information from TMDB api
// Called every week using CRON script
import db from './database.js'
import Movie from '../models/Movie.js'
import { getShowings, getFavorites } from './tmdb.js'
import { createTimes } from '../utils/showingsAlgorithm.js'

const transaction = await db.transaction();

try {
  // Update Movies table
  await Movie.drop({ lock: true, transaction })
  await Movie.sync({ lock: true, transaction })
  const showings = await getShowings()
  const favorites = await getFavorites()
  await createMovies(showings, false, transaction)
  await createMovies(favorites, true, transaction)

  // TODO: check if favorites includes any showings

  // Create showings for 1 week
  const times = createTimes(favorites, showings, 7)
  console.log(times)

  await transaction.commit()
} catch (err) {
  console.log(err)
  await transaction.rollback()
}

function createMovies(results, favorite, transaction) {
  return Promise.all(results.map(result => {
    return new Promise(async (resolve, reject) => {
      try {
        const movie = await Movie.create({
          favorite,
          apiID: result.id,
          title: result.title,
          overview: result.overview,
          release: result.release_date,
          trailer: result.trailer,
          backdrop: result.backdrop,
          poster: result.poster,
        }, { lock: true, transaction })
        resolve(movie)
      } catch (err) {
        reject(err)
      }
    })
  }))
}