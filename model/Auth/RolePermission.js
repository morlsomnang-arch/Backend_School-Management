import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/db.js'
import { Role } from './Role.js'
import { Permission } from './Permission.js'

export const RolePermission = sequelize.define('RolePermission', {
  role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Role,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  permission_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Permission,
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'role_permission',
  timestamps: false
})

// Associations
Role.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: 'role_id',
  otherKey: 'permission_id'
})

Permission.belongsToMany(Role, {
  through: RolePermission,
  foreignKey: 'permission_id',
  otherKey: 'role_id'
})
