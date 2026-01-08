import express from "express";
import {
  getAll,
  getByClassId,
  create,
  update,
  remove,
  assignOrUpdate
} from "../../controllers/Student_controller/classClasstype.controller.js";

import { auth } from "../../middleware/auth.middleware.js";
import { allowPermissions } from "../../middleware/permission.middleware.js";

const router = express.Router();
router.get(
  "/",
  auth,
  allowPermissions("view_class_classtype"),
  getAll
);

router.get(
  "/:class_id",
  auth,
  allowPermissions("view_class_classtype"),
  getByClassId
);
router.post(
  "/",
  auth,
  allowPermissions("create_class_classtype"),
  create
);
router.put(
  "/:id",
  auth,
  allowPermissions("update_class_classtype"),
  update
);
router.delete(
  "/:id",
  auth,
  allowPermissions("delete_class_classtype"),
  remove
);
router.post(
  "/assign",
  auth,
  allowPermissions("assign_class_classtype"),
  assignOrUpdate
);

export default router;
