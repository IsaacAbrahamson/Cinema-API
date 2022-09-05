import express from 'express'
import movie from './routes/movie.js'
const app = express()

app.use('/movie', movie)

export default app
