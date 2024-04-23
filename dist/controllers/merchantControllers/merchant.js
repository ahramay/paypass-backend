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
exports.getUserDetails = exports.fileUpdate = exports.fileInsert = exports.deleteMerchantClient = exports.updateMerchantClient = exports.getMerchantClient = exports.createMerchantClient = exports.getMerchantDetail = exports.getAllMerchantDetail = exports.updateMerchantStep = void 0;
const merchantModel_1 = __importDefault(require("../../models/Merchant/merchantModel"));
const userModel_1 = __importDefault(require("../../models/User/userModel"));
const merchatClinet_1 = __importDefault(require("../../models/Merchant/MerchantClient/merchatClinet"));
const merchantClientValidation_1 = __importDefault(require("../../validations/auth/merchantClientValidation"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const voucherFields_1 = __importDefault(require("../../models/Merchant/voucher/voucherFields"));
const JWT_SECRET = process.env.JWT_SECRET || "";
const JWT_EXPIRY = process.env.JWT_EXPIRY || "";
const updateMerchantStep = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const stepNumber = req.params.stepNumber;
    const updateData = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    try {
        let updateField = {}; // Type 'any' for simplicity; consider a proper type
        switch (stepNumber) {
            case "stepOne":
                updateField = { stepOne: updateData };
                break;
            case "stepTwo":
                updateField = { stepTwo: updateData };
                break;
            case "stepThree":
                updateField = { stepThree: updateData };
                break;
            case "stepFour":
                updateField = { stepFour: updateData };
                break;
            default:
                return res.status(400).json({ message: "Invalid step number" });
        }
        const merchant = yield merchantModel_1.default.findOne({ user: userId }); // Use findOne instead of find
        if (!merchant) {
            return res.status(404).json({ message: "Merchant not found" });
        }
        // console.log(updateField.stepThree)
        const updatedStep = yield merchantModel_1.default.findByIdAndUpdate(merchant._id, updateField, { new: true });
        if (!updatedStep) {
            return res.status(404).json({ message: "Merchant step not updated" });
        }
        if (updateField.stepFour) {
            yield userModel_1.default.findByIdAndUpdate(userId, { status: "pending" });
            // Find user to get email
            const user = yield userModel_1.default.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            // const userEmail: string = user.email;
            // await sendEmailToSuperAdmin('Merchant Step Updated', 'A merchant has updated their step.', userEmail);
            console.log(user);
        }
        res.status(200).json(updatedStep);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.updateMerchantStep = updateMerchantStep;
const getAllMerchantDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const merchant = yield merchantModel_1.default.find().populate('user');
    res.send(merchant);
});
exports.getAllMerchantDetail = getAllMerchantDetail;
// Get Merchant Detail
const getMerchantDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId;
    console.log(userId);
    // Find the associated merchant
    const merchant = yield merchantModel_1.default.findOne({ user: userId });
    // Determine which steps have data
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
    // Determine the last completed step
    const lastCompletedStep = completedSteps.length > 0 ? Math.max(...completedSteps) : null;
    res.json({
        merchantInformation: (merchant === null || merchant === void 0 ? void 0 : merchant.stepOne) || {},
        businessDetails: (merchant === null || merchant === void 0 ? void 0 : merchant.stepTwo) || {},
        operationsDetails: (merchant === null || merchant === void 0 ? void 0 : merchant.stepThree) || {},
        bankDetails: (merchant === null || merchant === void 0 ? void 0 : merchant.stepFour) || {},
        completedSteps,
        lastCompletedStep,
    });
});
exports.getMerchantDetail = getMerchantDetail;
// --------------------Merchant Client---------------------------------------
const createMerchantClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.userId;
        // Validate the registration data using the provided schema
        yield merchantClientValidation_1.default.validate(req.body, { abortEarly: false });
        // Check if the email already exists in the User model
        const existingUser = yield userModel_1.default.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).json({ error: "Email is already registered" });
        }
        const newUser = new userModel_1.default(Object.assign(Object.assign({}, req.body), { role: "staff", merchant: userId }));
        yield newUser.save();
        console.log("merchantId", userId);
        const newMerchantClient = new merchatClinet_1.default(Object.assign(Object.assign({}, req.body), { user: newUser._id, merchant: userId }));
        console.log("ssddsd", newMerchantClient);
        yield newMerchantClient.save();
        // Generate JWT token for the newly registered Merchant Client
        const token = jsonwebtoken_1.default.sign({ userId: newMerchantClient._id, role: "staff" }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
        // Respond with success message and token
        res.status(201).json({ success: true, message: "Merchant Client successfully registered", token });
    }
    catch (error) {
        console.error("Error registering Merchant Client:", error);
        // Respond with validation error or server error
        res.status(400).json({ error: "Validation error" });
    }
});
exports.createMerchantClient = createMerchantClient;
const getMerchantClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const userId = (_d = req.user) === null || _d === void 0 ? void 0 : _d.userId;
    const merchantUsers = yield merchatClinet_1.default.find({ merchant: userId }).sort({ createdAt: -1 });
    res.json(merchantUsers);
});
exports.getMerchantClient = getMerchantClient;
const updateMerchantClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // Get the merchant client ID from the request params
        // Validate the update data using the provided schema
        yield merchantClientValidation_1.default.validate(req.body, { abortEarly: false });
        // Find the existing Merchant Client by ID
        const existingMerchantClient = yield merchatClinet_1.default.findById(id);
        if (!existingMerchantClient) {
            return res.status(404).json({ error: "Merchant Client not found" });
        }
        // Update the Merchant Client data
        yield merchatClinet_1.default.findByIdAndUpdate(id, req.body);
        // Respond with success message
        res.status(200).json({ success: true, message: "Merchant Client successfully updated" });
    }
    catch (error) {
        console.error("Error updating Merchant Client:", error);
        // Respond with validation error or server error
        res.status(400).json({ error: "Validation error" });
    }
});
exports.updateMerchantClient = updateMerchantClient;
const deleteMerchantClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // Get the merchant client ID from the request params
        // Find the existing Merchant Client by ID
        const existingMerchantClient = yield merchatClinet_1.default.findById(id);
        if (!existingMerchantClient) {
            return res.status(404).json({ error: "Merchant Client not found" });
        }
        // Delete the Merchant Client
        yield merchatClinet_1.default.findByIdAndDelete(id);
        // Delete the associated user
        yield userModel_1.default.findByIdAndDelete(existingMerchantClient.user);
        // await User.findOne(existingMerchantClient.email)
        // Respond with success message
        res.status(200).json({ success: true, message: "Merchant Client successfully deleted" });
    }
    catch (error) {
        console.error("Error deleting Merchant Client:", error);
        // Respond with validation error or server error
        res.status(400).json({ error: "Validation error" });
    }
});
exports.deleteMerchantClient = deleteMerchantClient;
// export const updateUserProfilePic = async (req: Request, res: Response) => {
//   try {
//     const userId = req.user?.userId;
//     const file = req.file;
//     console.log("user",userId)
//     if (!file) {
//       return res.status(400).send('Invalid request');
//     }
//     // Upload file to S3
//     const path = await uploadFile(file, bucketFolders.ONBOARDING_FOLDER);
//     // Get user by ID
//     const merchant = await Merchant.findOne({ user: userId });
//     console.log("user",merchant)
//     // Handle case where merchant is null
//     if (!merchant) {
//       return res.status(404).send('Merchant not found');
//     }
//     // Update merchant profile picture URL
//     merchant.profilePic = path.url;
//     // Save merchant changes
//     await merchant.save();
//     // Respond with success message
//     res.status(200).send('Profile picture updated successfully');
//   } catch (error) {
//     console.error('Error updating profile picture:', error);
//     res.status(500).send('Internal server error');
//   }
// };
const fileInsert = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const voucherFields = req.body;
        const docs = yield voucherFields_1.default.insertMany(voucherFields);
        if (docs) {
            res.status(200).json({ success: true, message: "file upload success", docs });
        }
        else {
            res.status(400).json({
                success: false,
                message: "file upload failed",
            });
        }
    }
    catch (err) {
        console.error("file upload error: ", err);
        res.status(500).json({ success: false, message: "internal_server_error" });
    }
});
exports.fileInsert = fileInsert;
const fileUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const VoucherField = req.body;
        const promises = VoucherField.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            const updatedItem = yield voucherFields_1.default.findByIdAndUpdate(item._id, {
                $set: Object.assign({}, item),
            });
            return updatedItem;
        }));
        Promise.all(promises)
            .then(() => res.json({ success: true, message: "file upload success" }))
            .catch((err) => res.status(400).json(err));
    }
    catch (err) {
        console.error("file upload error: ", err);
        res.status(500).json({ success: false, message: "internal_server_error" });
    }
});
exports.fileUpdate = fileUpdate;
const getUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const userId = (_e = req.user) === null || _e === void 0 ? void 0 : _e.userId; // Assuming your decoded JWT payload has userId
    try {
        const user = yield userModel_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: `Error fetching user details: ${error.message}` });
    }
});
exports.getUserDetails = getUserDetails;
