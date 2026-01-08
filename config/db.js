import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

// Create Sequelize instance
export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // change to console.log if you want query logs
  }
)

// Test connection
export async function testConnection() {
  try {
    await sequelize.authenticate()
    console.log('✅ Database connected successfully (Sequelize)')
  } catch (err) {
    console.error('❌ Database connection failed:', err.message)
  }
}

// Optionally, call it here or from server.js
testConnection()
