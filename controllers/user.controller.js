import { db } from "../config/db.js";

// GET ALL USERS – Only Super Admin
export const getUsers = async (req, res) => {
  try {
    // Check if the logged-in user is Super
    if (req.user.role !== 'super') {
      return res.status(403).json({ message: "Access denied" });
    }

    const [rows] = await db.query(`
      SELECT u.id, u.name, u.email, r.name AS role
      FROM users u
      JOIN roles r ON u.role_id = r.id
    `);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// UPGRADE USER → SUPER – Only Super Admin
export const upgradeToSuper = async (req, res) => {
  try {
    // Only allow if the logged-in user is Super
    if (req.user.role !== 'super') {
      return res.status(403).json({ message: "Access denied" });
    }

    const { id } = req.params;

    // Upgrade user role to Super
    const [result] = await db.query(
      "UPDATE users SET role_id = 1 WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User upgraded to Super User" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /roles/:roleId/permissions
export const updateRolePermissions = async (req, res) => {
  const { permissions } = req.body; // ['create_students','update_students']
  const { roleId } = req.params;

  // 1. លុប permission ចាស់ទាំងអស់
  await db.query(
    "DELETE FROM role_permission WHERE role_id=?",
    [roleId]
  );

  // 2. បញ្ចូល permission ថ្មី
  for (const name of permissions) {
    const [[perm]] = await db.query(
      "SELECT id FROM permissions WHERE name=?",
      [name]
    );

    if (perm) {
      await db.query(
        "INSERT INTO role_permission (role_id, permission_id) VALUES (?,?)",
        [roleId, perm.id]
      );
    }
  }

  res.json({ message: "Permissions updated successfully" });
};
