import { DataTypes } from 'sequelize'
import Ticket from './Ticket.js'
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
})

Order.hasMany(Ticket)
Ticket.belongsTo(Order)

export default Order