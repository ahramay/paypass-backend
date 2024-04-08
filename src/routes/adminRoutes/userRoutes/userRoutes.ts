import express from "express";
import { getAllUser, getUserStatisticByStatus,deleteUser ,updateUser } from "../../../controllers/adminControllers/userDetailController";
import createGetDataApiHandler from "../../../services/createGetDataApiHandler";
import User from "../../../models/User/userModel";

const router = express.Router();

// Get All User
router.post('/all-user',createGetDataApiHandler(User,"fullName"))

// Update a user
router.put('/update-users/:id', updateUser);

// Delete a user
router.delete('/delete-users/:id', deleteUser);


// Get Merchant/user Statistic by Status
router.get('/user-statistic-by-status',getUserStatisticByStatus)

export default router;