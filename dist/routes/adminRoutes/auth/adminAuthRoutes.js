"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authAminController_1 = require("../../../controllers/adminControllers/auth/authAminController");
const router = express_1.default.Router();
router.post('/login', authAminController_1.loginAdmin);
router.post('/register', authAminController_1.registerAdmin);
exports.default = router;
