import jwt from "jsonwebtoken"
import { db } from "../config/db.js"

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) return res.sendStatus(401)

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const [users] = await db.query(`
      SELECT u.id, u.name, r.name AS role
      FROM users u
      JOIN roles r ON r.id = u.role_id
      WHERE u.id = ?
    `, [decoded.id])

    if (!users.length) return res.sendStatus(401)

    // 🔽 GET PERMISSIONS
    const [permissions] = await db.query(`
      SELECT p.name
      FROM permissions p
      JOIN role_permission rp ON rp.permission_id = p.id
      JOIN roles r ON r.id = rp.role_id
      WHERE r.name = ?
    `, [users[0].role])

    req.user = {
      ...users[0],
      permissions: permissions.map(p => p.name)
    }

    next()
  } catch (err) {
    console.error(err)
    res.sendStatus(403)
  }
}
