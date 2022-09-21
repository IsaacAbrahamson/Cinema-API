import Movie from '../models/Movie.js'
import Showing from '../models/Showing.js'

// Finds movie information based on movie id
// Example: /api/searchMovie?id=1
export async function searchMovie(req, res) {
  try {
    const movies = await Movie.findAll({
      where: {
        id: req.query.id
      },
      include: Showing
    })
    res.json(movies)
  } catch (err) {
    console.log(err)
    res.json({ err: 'An error occured.' })
  }
}

// Finds movie information based on showing id
// Example: /api/searchShowing?id=1
export async function searchShowing(req, res) {
  try {
    const showings = await Showing.findAll({
      where: {
        id: req.query.id
      },
      include: Movie
    })
    res.json(showings)
  } catch (err) {
    console.log(err)
    res.json({ err: 'An error occured.' })
  }
}

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