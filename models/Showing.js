import { DataTypes } from 'sequelize'
import db from '../utils/connectDB.js'

const Showing = db.define('showing', {
  time: {
    type: 'TIMESTAMP',
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
})

export default Showing