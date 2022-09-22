import { DataTypes } from 'sequelize'
import TicketHistory from './TicketHistory'
import User from './User'
import db from '../utils/connectDB'

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