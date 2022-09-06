import { DataTypes } from 'sequelize'
import db from '../utils/connectDB.js'

const Movie = db.define('Movie', {
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  seat_col: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  seat_row: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  available: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
})

export default Ticket