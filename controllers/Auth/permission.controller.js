import { Role, Permission } from "../../model/Relactioship/userAuth.js"

// GET ALL ROLES WITH PERMISSIONS
export const getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      include: {
        model: Permission,
        attributes: ['name'],
        through: { attributes: [] } // hide pivot
      },
      attributes: ['id', 'name']
    });

    const roleWithPerms = roles.map(r => ({
      id: r.id,
      name: r.name,
      permissions: r.Permissions.map(p => p.name)
    }));

    res.json(roleWithPerms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET ALL PERMISSIONS
export const getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.findAll({
      attributes: ['id', 'name']
    });
    res.json(permissions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ASSIGN PERMISSIONS TO ROLE
export const assignPermissionsToRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    const { permissions } = req.body; // array of permission names

    const role = await Role.findByPk(roleId);
    if (!role) return res.status(404).json({ message: 'Role not found' });

    // Get permission instances by name
    const perms = await Permission.findAll({
      where: { name: permissions }
    });

    // Assign permissions (Sequelize will handle pivot table)
    await role.setPermissions(perms);

    res.json({ message: 'Permissions assigned successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
