"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserStatisticByStatus = exports.deleteUser = exports.updateUser = exports.getAllUser = void 0;
const userModel_1 = __importDefault(require("../../models/User/userModel"));
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pageIndex = 1, pageSize = 10, sort, query, filterData } = req.body;
    const sortField = sort && sort.key ? sort.key : "_id";
    const sortOrder = sort && sort.order === "desc" ? -1 : 1;
    const status = filterData && filterData.status ? filterData.status : null;
    const queryConditions = {};
    if (status) {
        queryConditions.status = status;
    }
    if (query) {
        queryConditions.fullName = new RegExp(query, "i");
    }
    const totalLength = yield userModel_1.default.countDocuments(queryConditions);
    const result = yield userModel_1.default.find(queryConditions)
        .sort({ [sortField]: sortOrder })
        .skip((pageIndex - 1) * pageSize)
        .limit(pageSize);
    res.json({ status: "success", data: result, total: totalLength });
});
exports.getAllUser = getAllUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userData = req.body;
        const existingUser = yield userModel_1.default.findById(id);
        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }
        yield userModel_1.default.findByIdAndUpdate(id, userData);
        res.json({ status: "success", message: "User updated successfully" });
    }
    catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ status: "error", message: "Error updating user" });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Check if the user exists
        const existingUser = yield userModel_1.default.findById(id);
        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }
        // Delete user
        yield userModel_1.default.findByIdAndDelete(id);
        res.json({ status: "success", message: "User deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ status: "error", message: "Error deleting user" });
    }
});
exports.deleteUser = deleteUser;
const getUserStatisticByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userModel_1.default.aggregate([
        {
            $group: {
                _id: '$status',
                totalLength: { $sum: 1 },
            },
        },
    ]);
    const response = {
        totalUsers: yield userModel_1.default.countDocuments(),
        active: 0,
        pending: 0,
        onboarding: 0,
        blocked: 0,
        rejected: 0,
    };
    result.forEach((item) => {
        response[item._id] = item.totalLength;
    });
    res.json(response);
});
exports.getUserStatisticByStatus = getUserStatisticByStatus;
// export const getAllUser = async (req: Request, res: Response) => {
//   const page: number = parseInt(req.query.page as string, 10) || 1;
//   const pageSize: number = parseInt(req.query.pageSize as string, 10) || 10;
//   const skip = (page - 1) * pageSize;
//   const users = await User.find().skip(skip).limit(pageSize);
//   res.json({ data: users, total: users.length });
// };
