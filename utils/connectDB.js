import { Sequelize } from 'sequelize'
import * as dotenv from 'dotenv'
dotenv.config()

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: true,
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

export default db