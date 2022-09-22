import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize'
import sequelize from '../utils/connectDB'

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare email: string
  declare firstname: string
  declare lastname: string
  declare password: string
}

User.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  timestamps: false
})

export default User