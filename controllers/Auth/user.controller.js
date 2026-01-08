import { User } from "../../model/Auth/User.js"
import { Role, Permission } from "../../model/Relactioship/userAuth.js"

// Check Super Admin
const checkSuper = (role) => role === 'super'

export const getUsers = async (req, res) => {
  try {
    if (!checkSuper(req.user.role)) return res.status(403).json({ message: "Access denied" })

    const users = await User.findAll({
      include: [{ model: Role, attributes: ['name'] }],
      attributes: ['id', 'name', 'email']
    })

    const output = users.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.Role.name
    }))

    res.json(output)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

export const createUser = async (req, res) => {
  try {
    if (!checkSuper(req.user.role)) return res.status(403).json({ message: "Access denied" })
    const { name, email, role } = req.body
    const roleInstance = await Role.findOne({ where: { name: role } })
    if (!roleInstance) return res.status(400).json({ message: "Invalid role" })

    const user = await User.create({ name, email, role_id: roleInstance.id })
    res.json({ id: user.id, name, email, role })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

export const updateUser = async (req, res) => {
  try {
    if (!checkSuper(req.user.role)) return res.status(403).json({ message: "Access denied" })
    const { id } = req.params
    const { name, email, role } = req.body
    const roleInstance = await Role.findOne({ where: { name: role } })
    if (!roleInstance) return res.status(400).json({ message: "Invalid role" })

    const [updated] = await User.update({ name, email, role_id: roleInstance.id }, { where: { id } })
    if (!updated) return res.status(404).json({ message: "User not found" })
    res.json({ message: "User updated successfully" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

export const deleteUser = async (req, res) => {
  try {
    if (!checkSuper(req.user.role)) return res.status(403).json({ message: "Access denied" })
    const { id } = req.params
    const deleted = await User.destroy({ where: { id } })
    if (!deleted) return res.status(404).json({ message: "User not found" })
    res.json({ message: "User deleted successfully" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

export const upgradeToSuper = async (req, res) => {
  try {
    if (!checkSuper(req.user.role)) return res.status(403).json({ message: "Access denied" })
    const { id } = req.params
    const [updated] = await User.update({ role_id: 1 }, { where: { id } })
    if (!updated) return res.status(404).json({ message: "User not found" })
    res.json({ message: "User upgraded to Super User" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

export const updateRolePermissions = async (req, res) => {
  try {
    const { permissions } = req.body
    const { roleId } = req.params
    const role = await Role.findByPk(roleId)
    if (!role) return res.status(404).json({ message: "Role not found" })

    const perms = await Permission.findAll({ where: { name: permissions } })
    await role.setPermissions(perms)
    res.json({ message: "Permissions updated successfully" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}
