import express from "express";
import { getAllUser, getUserStatisticByStatus } from "../../../controllers/adminControllers/userDetailController";
import createGetDataApiHandler from "../../../services/createGetDataApiHandler";
import User from "../../../models/User/userModel";

const router = express.Router();

// Get All User
router.post('/all-user',createGetDataApiHandler(User,"fullName"))

// Get Merchant/user Statistic by Status
router.get('/user-statistic-by-status',getUserStatisticByStatus)

export default router;
