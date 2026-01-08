import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/db.js'

export const TypeParent = sequelize.define('TypeParent', {
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
  tableName: 'type_parents',
  timestamps: false // table មិនមាន created_at/updated_at
})
