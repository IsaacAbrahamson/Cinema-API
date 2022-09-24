import { Sequelize } from 'sequelize'
import * as dotenv from 'dotenv'
dotenv.config()

const sequelize: Sequelize = new Sequelize(process.env.DB_NAME || 'cinema', process.env.DB_USER || 'root', process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false,
  pool: {
    min: 10,
    max: 50
  },
  dialectOptions: {
    // @see https://github.com/sequelize/sequelize/issues/8019
    decimalNumbers: true,
    // @see https://github.com/sequelize/sequelize/issues/10832
    maxPreparedStatements: 100
  },
})

export default sequelize