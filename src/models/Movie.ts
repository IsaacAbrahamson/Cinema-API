import { DataTypes } from 'sequelize'
import db from '../utils/connectDB'
import Showing from './Showing'

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
    allowNull: true
  },
  backdrop: {
    type: DataTypes.STRING,
    allowNull: false
  },
  poster: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
})

Movie.hasMany(Showing)
Showing.belongsTo(Movie)

export default Movie