import { User } from '../Auth/User.js'
import { Role } from '../Auth/Role.js'
import { Permission } from '../Auth/Permission.js'
import { RolePermission } from '../Auth/RolePermission.js'

User.belongsTo(Role, { foreignKey: 'role_id' })
Role.hasMany(User, { foreignKey: 'role_id' })
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

export {
  User,
  Role,
  Permission,
  RolePermission
}
