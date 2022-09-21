import express from 'express'
import movieRoutes from './routes/movie.js'
import ticketRoutes from './routes/ticket.js'
import authRoutes from './routes/auth.js'
const app = express()
app.use(express.json())

app.use('/api/movie', movieRoutes)
app.use('/api/ticket', ticketRoutes)
app.use('/api/auth', authRoutes)

export default app
