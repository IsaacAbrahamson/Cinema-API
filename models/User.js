import { DataTypes } from 'sequelize'
import Order from './Order.js'
import db from '../utils/connectDB.js'

const User = db.define('User', {
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

User.hasMany(Order)
Order.belongsTo(User)

export default User