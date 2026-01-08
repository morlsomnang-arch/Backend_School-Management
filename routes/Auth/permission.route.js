import express from "express"
import { getRoles, getPermissions, assignPermissionsToRole } from "../../controllers/Auth/permission.controller.js"
import { auth } from "../../middleware/auth.middleware.js"
import { allowPermissions } from "../../middleware/permission.middleware.js"

const router = express.Router()

router.get("/", auth, allowPermissions("super"), getRoles)
router.get("/permissions", auth, allowPermissions("super"), getPermissions)
router.put("/:roleId/permissions", auth, allowPermissions("super"), assignPermissionsToRole)

export default router
