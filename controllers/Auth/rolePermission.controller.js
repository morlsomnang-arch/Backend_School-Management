import { Role } from '../../model/Auth/Role.js'
import { Permission } from '../../model/Auth/Permission.js'
import { RolePermission } from '../../model/Auth/RolePermission.js'


/** GET /api/roles → list all roles */
export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({ attributes: ['id', 'name'] })
    res.json(roles)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

/** GET /api/permissions → list all permissions */
export const getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.findAll({ attributes: ['id', 'name'] })
    res.json(permissions)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

/** GET /api/roles/:id → get role + assigned permissions */
export const getRoleWithPermissions = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id, {
      include: [
        {
          model: Permission,
          attributes: ['id', 'name'],
          through: { attributes: [] } // exclude RolePermission fields
        }
      ]
    })

    if (!role) return res.status(404).json({ message: 'Role not found' })

    res.json(role)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

export const assignPermissionsToRole = async (req, res) => {
  const { id } = req.params
  const { permission_ids } = req.body

  if (!Array.isArray(permission_ids)) {
    return res.status(400).json({ message: 'permission_ids must be an array' })
  }

  try {
    const role = await Role.findByPk(id)
    if (!role) return res.status(404).json({ message: 'Role not found' })

    // ใช้ built-in association method
    await role.setPermissions(permission_ids) // auto remove old, add new

    res.json({ success: true, message: 'Permissions assigned successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}
