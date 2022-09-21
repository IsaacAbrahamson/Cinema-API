import { DataTypes } from 'sequelize'
import TicketHistory from './TicketHistory.js'
import User from './User.js'
import db from '../utils/connectDB.js'

const Order = db.define('Order', {
  date: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
})

User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(TicketHistory)
TicketHistory.belongsTo(Order)

export default Order