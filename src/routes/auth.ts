import express, { application } from 'express'
const router = express.Router()

router.get('/register', (req, res) => {
  res.send('register')
})

export default router