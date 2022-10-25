import { fileURLToPath } from 'url'
import path from 'path'
import { Sequelize } from 'sequelize'
import * as dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const envPath = path.join(__dirname, '..', '.env')
dotenv.config({ path: envPath })

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
    maxPreparedStatements: 100,
    // cannot connect to db as root through tcp so use socket
    socketPath: '/var/run/mysqld/mysqld.sock'
  },
})

export default sequelize