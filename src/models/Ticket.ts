import { DataTypes } from 'sequelize'
import db from '../utils/connectDB'

const Ticket = db.define('Ticket', {
  seat: {
    type: DataTypes.STRING,
  }
}, {
  timestamps: false
})

export default Ticket