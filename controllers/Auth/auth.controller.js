import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../../model/Auth/User.js'
import { Role } from '../../model/Auth/Role.js'
import { Permission } from '../../model/Auth/Permission.js'

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const hash = await bcrypt.hash(password, 10)

    // get guest role
    const role = await Role.findOne({ where: { name: 'guest' } })
    if (!role) return res.status(400).json({ message: 'Default role not found' })

    // create user
    await User.create({
      name,
      email,
      password: hash,
      role_id: role.id
    })

    res.json({ message: 'Register success' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({
      where: { email },
      include: { model: Role, include: Permission }
    })

    if (!user) return res.status(401).json({ message: 'User not found' })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(401).json({ message: 'Wrong password' })

    // get permission names
    const permissionNames = user.Role.Permissions.map(p => p.name)

    // create JWT
    const token = jwt.sign(
      { id: user.id, role: user.Role.name },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.Role.name,
        permissions: permissionNames
      }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}
