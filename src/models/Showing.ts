import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize'
import sequelize from '../utils/connectDB'
import Ticket from './Ticket.js'

class Showing extends Model<InferAttributes<Showing>, InferCreationAttributes<Showing>> {
  declare date: string
  declare time: string
  declare room: string
  declare apiID: string
}

Showing.init({
  date: {
    type: DataTypes.STRING,
    allowNull: false
  },
  time: {
    type: DataTypes.STRING,
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
}, {
  sequelize,
  timestamps: false
})

Showing.hasMany(Ticket)
Ticket.belongsTo(Showing)

export default Showing