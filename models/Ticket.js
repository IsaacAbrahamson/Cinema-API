import { DataTypes } from 'sequelize'
import db from '../utils/database.js'

const Movie = db.define('Movie', {
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  seat_col: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  seat_row: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

export default Ticket