"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../controllers/authControllers/auth");
const router = express_1.default.Router();
// Register route
router.post('/register', auth_1.registerUser);
// Login route
router.post('/login', auth_1.loginUser);
// Forgot Password route
router.post('/forgot-password', auth_1.forgotPassword);
// Reset Password route
router.post('/reset-password', auth_1.resetPassword);
router.get("/test", (req, res) => {
    res.json({ success: true, message: "Test Success full" });
});
router.put('/update-user', auth_1.updateUser);
exports.default = router;
