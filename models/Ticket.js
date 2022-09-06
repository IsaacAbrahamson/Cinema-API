import { DataTypes } from 'sequelize'
import db from '../utils/connectDB.js'

const Ticket = db.define('Ticket', {
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  seat_row: {
    type: DataTypes.CHAR,
    allowNull: false
  },
  seat_col: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  available: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
})

export default Ticket