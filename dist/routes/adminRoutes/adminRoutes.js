"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./userRoutes/userRoutes"));
const adminAuthRoutes_1 = __importDefault(require("./auth/adminAuthRoutes"));
const router = express_1.default.Router();
// User Detail Routes 
router.use("/user", userRoutes_1.default);
router.use('/auth', adminAuthRoutes_1.default);
exports.default = router;
