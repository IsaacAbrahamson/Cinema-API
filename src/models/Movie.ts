import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize'
import sequelize from '../utils/connectDB'
import Showing from './Showing'

class Movie extends Model<InferAttributes<Movie>, InferCreationAttributes<Movie>> {
  declare favorite: CreationOptional<boolean>
  declare apiID: number
  declare title: string
  declare overview: string
  declare release: string
  declare trailer: CreationOptional<string>
  declare backdrop: string
  declare poster: string
}

Movie.init({
  favorite: {
    type: DataTypes.BOOLEAN,
    allowNull: true
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
  sequelize,
  timestamps: false
})

Movie.hasMany(Showing)
Showing.belongsTo(Movie)

export default Movie