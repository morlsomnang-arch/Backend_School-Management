import express from "express";
import {
  getAcademyYears,
  getAcademyYearById,
  createAcademyYear,
  updateAcademyYear,
  deleteAcademyYear
} from "../../controllers/Student_controller/academyYear.controller.js";

import { auth } from "../../middleware/auth.middleware.js";
import { allowPermissions } from "../../middleware/permission.middleware.js";

const router = express.Router();

/* CRUD Routes */
router.get("/",
  //  auth, 
   getAcademyYears);
router.get("/:id", auth, getAcademyYearById);
router.post("/", auth, allowPermissions("create_academy_year"), createAcademyYear);
router.put("/:id", auth, allowPermissions("update_academy_year"), updateAcademyYear);
router.delete("/:id", auth, allowPermissions("delete_academy_year"), deleteAcademyYear);

export default router;
