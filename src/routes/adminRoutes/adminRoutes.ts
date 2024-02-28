import express from "express";
import userRoutes from "./userRoutes/userRoutes";
import adminAuthRoutes from "./auth/adminAuthRoutes"
const router = express.Router();

// User Detail Routes 
router.use("/user", userRoutes);
router.use('/auth',adminAuthRoutes)

export default router;
