// Updates database with latest information from TMDB api
// Called every week using CRON script
import db from './connectDB.js'
import Showing from '../models/Showing.js'
import Movie from '../models/Movie.js'
import { getShowings, getFavorites } from './tmdb.js'
import { createTimes } from '../utils/showingsAlgorithm.js'

const transaction = await db.transaction()

try {
  // Drop current tables
  await db.sync({ force: true, lock: true, transaction })

  // Query TMDB api to get currently playing movies
  const showings = await getShowings()
  const favorites = await getFavorites()

  // Add movies table to database
  await createMovies(showings, false, transaction)
  await createMovies(favorites, true, transaction)

  // Add showings table to database
  const times = createTimes(favorites, showings, 7)
  for (let i = 0; i < times.length; i++) {
    await createShowings(times[i])
  }

  // Add tickets table to database

  // Create foriegn keys
  await createAssociations()

  await transaction.commit()
} catch (err) {
  console.log(err)
  await transaction.rollback()
}

async function createAssociations() {
  const movies = await Movie.findAll()

  for (let movie of movies) {
    const showings = await Showing.findAll({
      where: {
        apiID: movie.apiID
      }
    })

    movie.addShowings(showings)
  }
}

function createShowings(times) {
  return Promise.all(times.map(result => {
    return new Promise(async (resolve, reject) => {

      try {
        const showing = await Showing.create({
          time: result.time,
          room: result.name,
          apiID: result.apiID,
        }, { lock: true, transaction })
        resolve(showing)
      } catch (err) {
        reject(err)
      }

    })
  }))
}


// TODO: Bulk create?
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