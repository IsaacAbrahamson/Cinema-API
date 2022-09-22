import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize'
import sequelize from '../utils/connectDB'

class TicketHistory extends Model<InferAttributes<TicketHistory>, InferCreationAttributes<TicketHistory>> {
  declare name: string
  declare time: string
  declare poster: string
  declare room: string
  declare seat: string
}

// TicketHistory persists all of the related ticket data after checkout because
// Tickets, Movies, and Showings tables are all reset on every API update run
TicketHistory.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false
  },
  poster: {
    type: DataTypes.STRING,
    allowNull: false
  },
  room: {
    type: DataTypes.STRING,
    allowNull: false
  },
  seat: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  timestamps: false
})

export default TicketHistory