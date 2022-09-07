import express from 'express'
import bodyParser from 'body-parser'
import movie from './routes/movie.js'
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/movie', movie)

export default app
