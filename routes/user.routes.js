import express from "express"
import { getUsers, upgradeToSuper,updateRolePermissions } from "../controllers/user.controller.js"
import { auth } from "../middleware/auth.middleware.js"
import { allowPermissions } from "../middleware/permission.middleware.js"

const router = express.Router()

// Only super users can access
router.get("/", auth, allowPermissions("super"), getUsers)
router.put("/upgrade/:id", auth, allowPermissions("super"), upgradeToSuper)
router.put("/roles/:roleId/permissions",auth,allowPermissions("super"), updateRolePermissions
);


export default router
