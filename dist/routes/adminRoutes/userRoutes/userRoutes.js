"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userDetailController_1 = require("../../../controllers/adminControllers/userDetailController");
const createGetDataApiHandler_1 = __importDefault(require("../../../services/createGetDataApiHandler"));
const userModel_1 = __importDefault(require("../../../models/User/userModel"));
const router = express_1.default.Router();
// Get All User
router.post('/all-user', (0, createGetDataApiHandler_1.default)(userModel_1.default, "fullName"));
// Update a user
router.put('/update-users/:id', userDetailController_1.updateUser);
// Delete a user
router.delete('/delete-users/:id', userDetailController_1.deleteUser);
// Get Merchant/user Statistic by Status
router.get('/user-statistic-by-status', userDetailController_1.getUserStatisticByStatus);
exports.default = router;
