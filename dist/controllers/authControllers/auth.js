"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.resetPassword = exports.forgotPassword = exports.loginUser = exports.updateUser = exports.registerUser = void 0;
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = require("crypto");
const userModel_1 = __importDefault(require("../../models/User/userModel"));
const resetToken_1 = __importDefault(require("../../models/User/resetToken"));
const merchantModel_1 = __importDefault(require("../../models/Merchant/merchantModel"));
const authValidation_1 = __importStar(require("../../validations/auth/authValidation"));
const merchatClinet_1 = __importDefault(require("../../models/Merchant/MerchantClient/merchatClinet"));
const JWT_SECRET = process.env.JWT_SECRET || "";
const JWT_EXPIRY = process.env.JWT_EXPIRY || "";
// Register User
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    yield authValidation_1.default.validate(req.body, { abortEarly: false });
    // Check if the user already exists
    const existingUser = yield userModel_1.default.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ error: "User already exists" });
    }
    // Create and save the new user
    const newUser = new userModel_1.default(Object.assign({}, req.body));
    yield newUser.save();
    const newMerchant = new merchantModel_1.default({ user: newUser._id });
    yield newMerchant.save();
    res
        .status(201)
        .json({ success: true, message: "User Success Fully Registered" });
});
exports.registerUser = registerUser;
//update user
// export const updateUser = async (req: Request, res: Response) => {
//   // const { email, status } = req.body;
//   let { stepCount, profileCompeleted ,  email, status} = req.body;
//   try {
//       // Find the existing user
//       const existingUser = await User.findOne({ email });
//       // If user does not exist, return error
//       if (!existingUser) {
//           return res.status(409).json({ error: "User Not Found" });
//       }
//       // Update stepCount
//           // Convert stepCount to number and increment by 1
//           // stepCount = parseInt(stepCount, 10) + 1;
//           console.log("stepCount:",stepCount)
//       // Update profileCompeleted based on conditions
//       if (profileCompeleted === "0%") {
//         profileCompeleted = "25%";
//     } else if (profileCompeleted === "25%") {
//         profileCompeleted = "50%";
//     } else if (profileCompeleted === "50%") {
//         profileCompeleted = "75%";
//     } else if (profileCompeleted === "75%") {
//         profileCompeleted = "100%";
//     } else {
//         // Default to "25%" if the current value is not recognized
//         profileCompeleted = "25%";
//     }
//     if (stepCount === 0) {
//       stepCount = 1;
//   } else if (stepCount === 1) {
//     stepCount = 2;
//   } else if (stepCount === 2) {
//     stepCount = 3;
//   } else if (stepCount === 3) {
//     stepCount =4;
//   } else {
//       // Default to "25%" if the current value is not recognized
//       stepCount = 1;
//   }
//       // Update the user with new status, stepCount, and profileCompeleted
//       const updatedUser = await User.findOneAndUpdate(
//           { email },
//           { 
//               status: "active",
//               stepCount,
//               profileCompeleted
//           },
//           { new: true } // Return the updated user
//       );
//       console.log("existingUser-updated:", updatedUser);
//       // Send response
//       res.status(200).json({ message: "User updated successfully", user: updatedUser });
//   } catch (error) {
//       console.error('Error updating user:', error);
//       res.status(500).json({ error: "Internal Server Error" });
//   }
// };
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, status, stepCount, profileCompeleted } = req.body;
    try {
        // Find the existing user
        const existingUser = yield userModel_1.default.findOne({ email });
        // If user does not exist, return error
        if (!existingUser) {
            return res.status(409).json({ error: "User Not Found" });
        }
        // Update the user with new status, stepCount, and profileCompeleted
        const updatedUser = yield userModel_1.default.findOneAndUpdate({ email }, {
            status: "active",
            stepCount,
            profileCompeleted
        }, { new: true } // Return the updated user
        );
        console.log("existingUser-updated:", updatedUser);
        // Send response
        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    }
    catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.updateUser = updateUser;
// Login User
// Login User
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    yield authValidation_1.SignInValidationSchema.validate(req.body, { abortEarly: false });
    // Find the user by email
    const user = yield userModel_1.default.findOne({ email });
    // If the user is not found or the password doesn't match, return an error
    if (!user || !(yield argon2_1.default.verify(user.password, password))) {
        return res.status(403).json({ error: "Invalid credentials" });
    }
    // Find the associated merchant
    const merchant = yield merchantModel_1.default.findOne({ user: user._id });
    // Check if the user is a Merchant Client
    const merchantClient = yield merchatClinet_1.default.findOne({ user: user._id });
    if (merchantClient) {
        // If a Merchant Client is found, attempt to log in
        const validPassword = yield argon2_1.default.verify(merchantClient.password, password);
        if (validPassword) {
            // If password is valid, generate JWT token for Merchant Client
            const token = jsonwebtoken_1.default.sign({
                user: {
                    name: user.fullName,
                    organizationName: user.organizationName,
                    status: user.status,
                    role: user.role,
                    email: user.email
                },
            }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
            return res.status(200).json({ token, role: "merchantClient", user });
        }
    }
    // Check which steps have data
    const completedSteps = [];
    if (merchant) {
        if (merchant.stepOne)
            completedSteps.push(1);
        if (merchant.stepTwo)
            completedSteps.push(2);
        if (merchant.stepThree)
            completedSteps.push(3);
        if (merchant.stepFour)
            completedSteps.push(4);
    }
    // Determine the last completed step and the next step
    const lastCompletedStep = completedSteps.length > 0 ? Math.max(...completedSteps) : null;
    const nextStepNumber = lastCompletedStep !== null ? lastCompletedStep + 1 : 1;
    const totalSteps = 4; // Assuming there are four steps in total
    // Generate a JWT token
    const token = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRY,
    });
    res.json({
        token,
        user: {
            name: user.fullName,
            organizationName: user.organizationName,
            status: user.status,
            role: user.role,
            email: user.email
        },
        completedSteps,
        lastCompletedStep,
        nextStepNumber,
        totalSteps,
    });
});
exports.loginUser = loginUser;
// Forgot Password
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // Generate a reset token (you can use a library like crypto or uuid)
        const resetToken = generateResetToken();
        const tokenExpiration = new Date();
        tokenExpiration.setHours(tokenExpiration.getHours() + 2); // Expire in 2 hours
        // Create and save the reset token using the ResetToken model
        const resetTokenEntry = new resetToken_1.default({
            userId: user._id,
            token: resetToken,
            expiresAt: tokenExpiration,
        });
        yield resetTokenEntry.save();
        // Send an email with a link containing the resetToken
        // This step depends on your email sending setup
        res.json({ message: "Reset token sent to your email" });
    }
    catch (error) {
        res.status(500).json({ error: "Forgot password failed" });
    }
});
exports.forgotPassword = forgotPassword;
// Reset Password
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { resetToken, newPassword } = req.body;
    try {
        // Find the reset token in the ResetToken model
        const resetTokenEntry = yield resetToken_1.default.findOne({ token: resetToken });
        if (!resetTokenEntry) {
            return res.status(400).json({ error: "Invalid or expired reset token" });
        }
        if (resetTokenEntry.expiresAt < new Date()) {
            return res.status(400).json({ error: "Reset token has expired" });
        }
        const user = yield userModel_1.default.findById(resetTokenEntry.userId);
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }
        // Hash the new password using argon2
        const hashedPassword = yield argon2_1.default.hash(newPassword);
        // Update the user's password and remove the reset token
        user.password = hashedPassword;
        yield user.save();
        // Remove the reset token entry
        yield resetToken_1.default.deleteOne({ _id: resetTokenEntry._id });
        res.json({ message: "Password reset successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Password reset failed" });
    }
});
exports.resetPassword = resetPassword;
// Generate Token
const generateResetToken = () => {
    const token = (0, crypto_1.randomBytes)(32).toString("hex"); // Generate a 32-character hex token
    return token;
};
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Your implementation here
});
