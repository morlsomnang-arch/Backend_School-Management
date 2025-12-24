import express from "express";
import { createStudent, getStudents, updateStudent, deleteStudent } from "../controllers/student.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// router.get("/", auth, getStudents);
// router.post("/", auth, upload.single("image"), createStudent);
// router.put("/:id", auth, upload.single("image"), updateStudent);
// router.delete("/:id", auth, deleteStudent);
// routes/student.route.js
router.get("/", getStudents);          
router.post("/", upload.single("image"), createStudent); 
router.put("/:id", upload.single("image"), updateStudent); 
router.delete("/:id", deleteStudent); 


export default router;
