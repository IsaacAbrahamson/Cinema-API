import { DataTypes } from 'sequelize'
import TicketHistory from './TicketHistory.js'
import db from '../utils/connectDB.js'

const Order = db.define('Order', {
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  timestamps: false
})

Order.hasMany(TicketHistory)
TicketHistory.belongsTo(Order)

export default Order