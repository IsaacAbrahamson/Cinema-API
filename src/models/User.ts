import { DataTypes } from 'sequelize'
import db from '../utils/connectDB'

const User = db.define('User', {
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
  timestamps: false
})

export default User