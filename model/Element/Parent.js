import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/db.js'

export const Parent = sequelize.define('Parent', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  name_kh: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  name_en: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  gender: {
    type: DataTypes.ENUM('male', 'female'),
    allowNull: false
  },
  occupation: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  type_parent_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false
  }
}, {
  tableName: 'parents',
  timestamps: false // table មិនមាន created_at/updated_at
})
