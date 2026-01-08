import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/db.js'

export const AcademyYear = sequelize.define('AcademyYear', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: false
  }
}, {
  tableName: 'academy_years',
  timestamps: false
})
