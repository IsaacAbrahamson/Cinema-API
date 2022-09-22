import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize'
import sequelize from '../utils/connectDB'
import TicketHistory from './TicketHistory'
import User from './User'

class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
  declare date: string
}

Order.init({
  date: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  timestamps: false
})

User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(TicketHistory)
TicketHistory.belongsTo(Order)

export default Order