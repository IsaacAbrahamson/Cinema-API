import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize'
import sequelize from '../utils/connectDB'

class Ticket extends Model<InferAttributes<Ticket>, InferCreationAttributes<Ticket>> {
  declare seat: string
}

Ticket.init({
  seat: {
    type: DataTypes.STRING,
  }
}, {
  sequelize,
  timestamps: false
})

export default Ticket