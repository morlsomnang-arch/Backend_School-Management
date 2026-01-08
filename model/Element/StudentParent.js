import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/db.js'
export const StudentParent = sequelize.define('StudentParent', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  student_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false
  },
  parent_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false
  }
}, {
  tableName: 'student_parents',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['student_id', 'parent_id']
    }
  ]
})
