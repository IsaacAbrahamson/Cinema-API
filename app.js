import express from 'express'
import movie from './routes/movie.js'
import ticket from './routes/ticket.js'
const app = express()
app.use(express.json())

app.use('/api/movie', movie)
app.use('/api/ticket', ticket)

export default app
