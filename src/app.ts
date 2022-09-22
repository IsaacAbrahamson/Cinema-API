import express from 'express'

// Import route middleware
import movieRoutes from './routes/movie'
import ticketRoutes from './routes/ticket'
import authRoutes from './routes/auth'
import orderRoutes from './routes/order'

const app = express()
app.use(express.json())

app.use('/api/movie', movieRoutes)
app.use('/api/ticket', ticketRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/order', orderRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
