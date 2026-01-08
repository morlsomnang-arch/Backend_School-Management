import { Role } from "../model/Auth/Role.js"
import { Permission } from "../model/Auth/Permission.js"

export const allowPermissions = (...permissions) => {
  return async (req, res, next) => {
    try {
      // 1️⃣ Check user
      if (!req.user) {
        return res.status(403).json({ message: "No user attached" })
      }

      // 2️⃣ Super role bypass
      if (req.user.role === "super") {
        return next()
      }

      // 3️⃣ Get role with permissions
      const role = await Role.findOne({
        where: { name: req.user.role },
        include: [
          {
            model: Permission,
            attributes: ['name'],
            through: { attributes: [] }
          }
        ]
      })

      if (!role) {
        return res.status(403).json({ message: "Role not found" })
      }

      const userPermissions = role.Permissions.map(p => p.name)

      // 4️⃣ Check permission
      const allowed = permissions.some(p =>
        userPermissions.includes(p)
      )

      if (!allowed) {
        return res.status(403).json({ message: "Permission denied" })
      }

      next()
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: "Server error" })
    }
  }
}
