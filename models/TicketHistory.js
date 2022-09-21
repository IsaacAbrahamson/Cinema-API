import { DataTypes } from 'sequelize'
import db from '../utils/connectDB.js'

// TicketHistory persists all of the related ticket data after checkout because
// Tickets, Movies, and Showings tables are all reset on every API update run
const TicketHistory = db.define('TicketHistory', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false
  },
  poster: {
    type: DataTypes.STRING,
    allowNull: false
  },
  room: {
    type: DataTypes.STRING,
    allowNull: false
  },
  seat: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  timestamps: false
})

export default TicketHistory