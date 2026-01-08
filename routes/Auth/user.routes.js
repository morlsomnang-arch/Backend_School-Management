import express from "express";
import { auth } from "../../middleware/auth.middleware.js";
import { allowPermissions } from "../../middleware/permission.middleware.js";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  upgradeToSuper,
  updateRolePermissions
} from "../../controllers/Auth/user.controller.js";

const router = express.Router();
router.get("/", auth, allowPermissions("super"), getUsers);
router.post("/", auth, allowPermissions("super"), createUser);
router.put("/:id", auth, allowPermissions("super"), updateUser);
router.delete("/:id", auth, allowPermissions("super"), deleteUser);

// Upgrade user role
router.put("/upgrade/:id", auth, allowPermissions("super"), upgradeToSuper);

// Assign permissions to roles
router.put("/roles/:roleId/permissions", auth, allowPermissions("super"), updateRolePermissions);

export default router;
