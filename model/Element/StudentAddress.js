import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/db.js'

export const StudentAddress = sequelize.define('StudentAddress', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  student_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  address_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  address_type: { type: DataTypes.ENUM('birth','current'), allowNull: false }
}, {
  tableName: 'student_addresses',
  timestamps: false,
  indexes: [{ unique: true, fields: ['student_id', 'address_type'] }]
})
