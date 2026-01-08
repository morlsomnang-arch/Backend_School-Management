import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/db.js'

export const ClassClasstype = sequelize.define('ClassClasstype', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  class_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false
  },
  classtype_id: {          // ✅ ត្រូវ DB
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false
  },
  group_no: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  tableName: 'class_classtype',
  timestamps: false
})


