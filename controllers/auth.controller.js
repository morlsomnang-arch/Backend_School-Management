import { db } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  // default role = guest
  const [role] = await db.query(
    "SELECT id FROM roles WHERE name='guest'"
  );

  await db.query(
    "INSERT INTO users (name,email,password,role_id) VALUES (?,?,?,?)",
    [name, email, hash, role[0].id]
  );

  res.json({ message: "Register success" });
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  // 1️⃣ Get user + role
  const [users] = await db.query(`
    SELECT u.id, u.name, u.email, u.password, r.name AS role
    FROM users u
    JOIN roles r ON r.id = u.role_id
    WHERE u.email = ?
  `, [email]);

  if (!users.length) {
    return res.status(401).json({ message: "User not found" });
  }

  const user = users[0];

  // 2️⃣ Check password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: "Wrong password" });
  }

  // 3️⃣ Get permissions by role
  const [permissions] = await db.query(`
    SELECT p.name
    FROM permissions p
    JOIN role_permission rp ON rp.permission_id = p.id
    JOIN roles r ON r.id = rp.role_id
    WHERE r.name = ?
  `, [user.role]);

  const permissionNames = permissions.map(p => p.name);

  // 4️⃣ Create token
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  // 5️⃣ Return user + permissions
  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      permissions: permissionNames
    }
  });
};