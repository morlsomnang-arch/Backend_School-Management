import express from "express";
import cors from "cors";

import authRoutes from "./routes/Auth/auth.routes.js";
import permissionRoutes from "./routes/Auth/permission.route.js";
import userRoutes from "./routes/Auth/user.routes.js";
import rolePermission  from "./routes/Auth/rolePermission.route.js"

import studentRoutes from "./routes/Student_/student.routes.js";
import classRoutes from './routes/Student_/class.Routes.js';
import classType from './routes/Student_/classtype.route.js';
import classClasstypeRoutes from './routes/Student_/classClasstype.route.js';

import academyYearRoutes from "./routes/Student_/academyYear.route.js";
import serviceRoutes from "./routes/Student_/service.route.js";
import parentRoutes from "./routes/Student_/parent.route.js";
import typeParentRoutes from "./routes/Student_/typeParent.route.js";

// 🔽 Initialize relationships
import './model/Relactioship/relationships.js';
import './model/Relactioship/userAuth.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/uploads', express.static('uploads'));

app.use("/api/auth", authRoutes);   
app.use("/api",rolePermission);

app.use("/api/students", studentRoutes);
app.use('/api/class-classtypes', classClasstypeRoutes);
app.use('/api/class-types', classType);
app.use('/api/classes', classRoutes);
app.use("/api/users", userRoutes);  
app.use("/api/permissions", permissionRoutes);
app.use("/api/academy-years", academyYearRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/parents", parentRoutes);
app.use("/api/type-parents", typeParentRoutes);

export default app;
