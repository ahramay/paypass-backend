import express from "express";
import { authMiddleware } from "../../../middlewares/authMiddleware";
import {
    addUser,
  } from "../../../controllers/merchantControllers/merchatuser/newTestingController";

const router = express.Router();


// create new merchantUser
router.post("/", addUser);

router.use(authMiddleware);

export default router;