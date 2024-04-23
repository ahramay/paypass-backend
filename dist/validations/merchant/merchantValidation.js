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
exports.validateUserExists = void 0;
const merchantModel_1 = __importDefault(require("../../models/Merchant/merchantModel"));
// Middleware to validate if the user exists
const validateUserExists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    try {
        const existingMerchant = yield merchantModel_1.default.findOne({ userId });
        if (!existingMerchant) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Attach the existingMerchant to the request for use in the controllers
        req.existingMerchant = existingMerchant;
        next();
    }
    catch (error) {
        console.error('Error in validateUserExists middleware:', error);
        res.status(500).json({ error: 'Validation failed' });
    }
});
exports.validateUserExists = validateUserExists;
