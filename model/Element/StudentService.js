import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/db.js'

export const StudentService = sequelize.define('StudentService', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  student_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  class_classtype_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  academy_year_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  remark: { type: DataTypes.STRING(255) }
}, { tableName: 'student_services', timestamps: false })
