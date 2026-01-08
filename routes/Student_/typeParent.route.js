import express from "express"
import { auth } from "../../middleware/auth.middleware.js"
import { allowPermissions } from "../../middleware/permission.middleware.js"
import {
  getTypeParents,
  getTypeParentById,
  createTypeParent,
  updateTypeParent,
  deleteTypeParent
} from "../../controllers/Student_controller/typeParent.controller.js"

const router = express.Router()

// GET all type parents
router.get("/", auth, allowPermissions("view_parent"), getTypeParents)

// GET single type parent
router.get("/:id", auth, allowPermissions("view_parent"), getTypeParentById)

// CREATE type parent
router.post("/", auth, allowPermissions("create_parent"), createTypeParent)

// UPDATE type parent
router.put("/:id", auth, allowPermissions("edit_parent"), updateTypeParent)

// DELETE type parent
router.delete("/:id", auth, allowPermissions("delete_parent"), deleteTypeParent)

export default router
