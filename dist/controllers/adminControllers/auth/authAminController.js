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
exports.loginAdmin = exports.registerAdmin = void 0;
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminModel_1 = __importDefault(require("../../../models/Admin/adminModel"));
const authValidation_1 = require("../../../validations/auth/authValidation");
const JWT_SECRET = process.env.JWT_SECRET || "";
const JWT_EXPIRY = process.env.JWT_EXPIRY || "";
// Register User
const registerAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    // await registrationSchema.validate(req.body, { abortEarly: false });
    // Check if the user already exists
    const existingUser = yield adminModel_1.default.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ error: "User already exists" });
    }
    // Create and save the new user
    const newUser = new adminModel_1.default(Object.assign({}, req.body));
    yield newUser.save();
    res
        .status(201)
        .json({ success: true, message: "User Success Fully Registered" });
});
exports.registerAdmin = registerAdmin;
// Login User
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    yield authValidation_1.SignInValidationSchema.validate(req.body, { abortEarly: false });
    // Find the user by email
    const user = yield adminModel_1.default.findOne({ email });
    // If the user is not found or the password doesn't match, return an error
    if (!user || !(yield argon2_1.default.verify(user.password, password))) {
        return res.status(403).json({ error: "Invalid credentials" });
    }
    // Generate a JWT token
    const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: JWT_EXPIRY,
    });
    res.json({
        token,
        user: {
            name: user.name,
        },
    });
});
exports.loginAdmin = loginAdmin;
