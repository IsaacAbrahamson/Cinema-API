import { DataTypes } from 'sequelize'
import db from '../utils/database.js'

const Movie = db.define('Movie', {
  favorite: {
    type: DataTypes.BOOLEAN
  },
  apiID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  overview: {
    type: DataTypes.TEXT('long'),
    allowNull: false
  },
  release: {
    type: DataTypes.STRING,
    allowNull: false
  },
  trailer: {
    type: DataTypes.STRING,
    allowNull: false
  },
  backdrop: {
    type: DataTypes.STRING,
    allowNull: false
  },
  poster: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

export default Movie