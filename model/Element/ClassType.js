import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/db.js'

export const ClassType = sequelize.define('ClassType', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'classtypes', // ⭐ ត្រូវ DB
  timestamps: false
})
