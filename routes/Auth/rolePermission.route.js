import express from 'express'
import { auth } from '../../middleware/auth.middleware.js'
import { allowPermissions } from '../../middleware/permission.middleware.js'
import {
  getAllRoles,
  getAllPermissions,
  getRoleWithPermissions,
  assignPermissionsToRole
} from '../../controllers/Auth/rolePermission.controller.js'

const router = express.Router()

// GET all roles
router.get('/roles', auth, allowPermissions('view_role'), getAllRoles)

// GET all permissions
router.get('/permissions', auth, allowPermissions('view_permission'), getAllPermissions)

// GET role + permissions
router.get('/roles/:id', auth, allowPermissions('view_role'), getRoleWithPermissions)

// POST assign permissions
router.post('/roles/:id/permissions', auth, allowPermissions('assign_permission'), assignPermissionsToRole)

export default router
