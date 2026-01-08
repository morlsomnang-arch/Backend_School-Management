import jwt from "jsonwebtoken"
import { User } from "../model/Auth/User.js"
import { Role } from "../model/Auth/Role.js"
import { Permission } from "../model/Auth/Permission.js"

export const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.sendStatus(401)

    const token = authHeader.split(" ")[1]
    if (!token) return res.sendStatus(401)
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findByPk(decoded.id, {
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: Role,
          attributes: ['name'],
          include: [
            {
              model: Permission,
              attributes: ['name'],
              through: { attributes: [] } 
            }
          ]
        }
      ]
    })

    if (!user) return res.sendStatus(401)
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.Role.name,
      permissions: user.Role.Permissions.map(p => p.name)
    }

    next()
  } catch (err) {
    console.error(err)
    res.sendStatus(403)
  }
}
