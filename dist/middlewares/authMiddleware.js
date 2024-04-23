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
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/User/userModel"));
const JWT_SECRET = process.env.JWT_SECRET || '';
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Authorization denied. No token provided' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const user = yield userModel_1.default.findById(decoded.userId);
        if (!user || user._id.toString() !== decoded.userId) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
});
exports.authMiddleware = authMiddleware;
