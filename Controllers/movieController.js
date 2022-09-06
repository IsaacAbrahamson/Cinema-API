import Movie from '../models/Movie.js'

export async function findAll(req, res) {
  const movies = await Movie.findAll()
  res.json(movies)
}

export async function findFavorites(req, res) {
  const movies = await Movie.findAll({
    where: {
      favorite: true
    }
  })
  res.json(movies)
}

export async function findShowings(req, res) {
  const movies = await Movie.findAll({
    where: {
      favorite: false
    }
  })
  res.json(movies)
}