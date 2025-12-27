import { db } from "../config/db.js";

export const allowPermissions = (...permissions) => {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(403).json({ message: "No user attached" });
    }

    if (req.user.role === "super") {
      return next();
    }

    const [rows] = await db.query(`
      SELECT p.name
      FROM permissions p
      JOIN role_permission rp ON rp.permission_id = p.id
      JOIN roles r ON r.id = rp.role_id
      WHERE r.name = ?
    `, [req.user.role]);

    const userPermissions = rows.map(p => p.name);

    const allowed = permissions.some(p =>
      userPermissions.includes(p)
    );

    if (!allowed) {
      return res.status(403).json({ message: "Permission denied" });
    }

    next();
  };
};
  