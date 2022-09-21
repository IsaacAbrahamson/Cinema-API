import { DataTypes } from 'sequelize'
import Ticket from './Ticket.js'
import db from '../utils/connectDB.js'

const Showing = db.define('showing', {
  date: {
    type: DataTypes.STRING,
    allowNull: false
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false
  },
  room: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apiID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  timestamps: false
})

Showing.hasMany(Ticket)
Ticket.belongsTo(Showing)

export default Showing