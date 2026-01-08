import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/db.js'

export const Class = sequelize.define('Class', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(100), allowNull: false }
}, { tableName: 'classes', timestamps: false })
