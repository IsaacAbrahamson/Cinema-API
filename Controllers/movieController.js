import Movie from '../models/Movie.js'
import Showing from '../models/Showing.js'

// Example: /api/movie/all
export async function findAll(req, res) {
  try {
    const movies = await Movie.findAll({ include: Showing })
    res.json(movies)
  } catch (err) {
    console.log(err)
    res.json({ err: 'An error occured.' })
  }
}

// Example: /api/movie/favorites?date=2022-09-06
export async function findFavorites(req, res) {
  try {
    const movies = await Movie.findAll({
      where: {
        favorite: true
      },
      include: {
        model: Showing,
        where: {
          date: req.query.date
        }
      }
    })
    res.json(movies)
  } catch (err) {
    console.log(err)
    res.json({ err: 'An error occured.' })
  }
}

// Example: /api/movie/showings?date=2022-09-06
export async function findShowings(req, res) {
  try {
    const movies = await Movie.findAll({
      where: {
        favorite: false
      },
      include: {
        model: Showing,
        where: {
          date: req.query.date
        }
      }
    })
    res.json(movies)
  } catch (err) {
    console.log(err)
    res.json({ err: 'An error occured.' })
  }
}