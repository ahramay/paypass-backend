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
exports.UpdateStatus = exports.deleteVoucher = exports.AddVoucher = exports.getMerchantVoucher = exports.exacelUpdate = exports.getExacel = exports.exacelInsert = void 0;
const voucherModel_1 = __importDefault(require("../../../models/Merchant/voucher/voucherModel"));
const models_1 = require("../../../models/Merchant/voucher/models");
// import ExcelJS from 'exceljs';
const exacelInsert = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const excelUploads = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        console.log("userId-here:", userId);
        // Generate voucher ID for each upload
        for (let excelUpload of excelUploads) {
            excelUpload.voucherId = yield generateVoucherId();
            excelUpload.merchant = userId;
        }
        // Insert uploads into the database
        const insertedUploads = yield models_1.ExacelUpload.insertMany(excelUploads);
        // Extract status from each inserted document
        const statuses = insertedUploads.map((upload) => upload.status);
        console.log("statuses:", statuses, "insertedUploads:", insertedUploads);
        res.status(200).json({
            success: true,
            insertedUploads: insertedUploads,
            message: "Excel Upload success",
            statuses: statuses,
        });
    }
    catch (err) {
        console.error("Excel Upload error: ", err);
        res.status(500).json({ success: false, message: "internal_server_error" });
    }
});
exports.exacelInsert = exacelInsert;
const generateVoucherId = () => __awaiter(void 0, void 0, void 0, function* () {
    let voucherId = 0; // Initialize with a default value
    // Generate a unique 7-digit voucher ID
    let isUnique = false;
    while (!isUnique) {
        voucherId = Math.floor(1000000 + Math.random() * 9000000); // Generate random 7-digit number
        const existingVoucher = yield models_1.ExacelUpload.findOne({ voucherId });
        if (!existingVoucher) {
            isUnique = true;
        }
    }
    return voucherId;
});
const getExacel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        // Extract query parameters from the request
        const query = req.query || {};
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId;
        // Find documents based on the query
        // const merchant = await User.findOne({ user: userId });
        console.log("ht", userId);
        const result = yield models_1.ExacelUpload.find({ merchant: userId }).sort({ createdAt: -1 });
        console.log("ss", result);
        // Send the response with the found documents
        res.status(200).json(result);
    }
    catch (error) {
        // Handle errors
        console.error("Error in getMerchantVoucher:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getExacel = getExacel;
const exacelUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ExacelUploads = req.body;
        // Generate voucher ID for each ExacelUpload (if voucher ID is not provided)
        for (let ExacelUpload of ExacelUploads) {
            if (!ExacelUpload.voucherId) {
                ExacelUpload.voucherId = yield generateVoucherId(); // Generate unique voucher ID
            }
        }
        // Update ExacelUploads in the database
        const promises = ExacelUploads.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            const updatedExacelUpload = yield models_1.ExacelUpload.findByIdAndUpdate(item._id, {
                $set: Object.assign({}, item),
            });
            return updatedExacelUpload;
        }));
        // Wait for all update operations to complete
        Promise.all(promises)
            .then(() => res.json({ success: true, message: "Exacel Upload success" }))
            .catch((err) => res.status(400).json(err));
    }
    catch (err) {
        console.error("Exacel Upload error: ", err);
        res.status(500).json({ success: false, message: "internal_server_error" });
    }
});
exports.exacelUpdate = exacelUpdate;
const getMerchantVoucher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.userId;
    const vouchers = yield voucherModel_1.default.find({ merchant: userId }).sort({ createdAt: -1 });
    res.send(vouchers);
});
exports.getMerchantVoucher = getMerchantVoucher;
const AddVoucher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const data = req.body;
    const userId = (_d = req.user) === null || _d === void 0 ? void 0 : _d.userId;
    // Create the voucher with the generated ID
    const voucher = yield voucherModel_1.default.create(Object.assign(Object.assign({}, data), { merchant: userId }));
    res.status(201).json(voucher);
});
exports.AddVoucher = AddVoucher;
const deleteVoucher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const voucherId = req.params.voucherId;
    const existingVoucher = yield voucherModel_1.default.findByIdAndDelete(voucherId);
    if (!existingVoucher) {
        return res.status(404).json({
            success: false,
            message: "Voucher Not Found",
        });
    }
    res.json({
        success: true,
        message: "Voucher Success fully Deleted",
    });
});
exports.deleteVoucher = deleteVoucher;
const UpdateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    const existingExcel = yield models_1.ExacelUpload.findById(id);
    if (!existingExcel) {
        return res.status(404).json({ error: "User not found" });
    }
    const currentDate = new Date();
    console.log("req.body:", req.body, "currentDate:", currentDate);
    try {
        if (!status) {
            res.status(404).json({ message: "id ,status is missing" });
        }
        console.log("sss");
        const voucher = yield models_1.ExacelUpload.findByIdAndUpdate(id, { status, paidDate: currentDate }, { new: true });
        console.log("voucher:", voucher);
        res.status(200).json({ message: "Status updated Sucessfuly" });
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json("internal Server Error");
    }
});
exports.UpdateStatus = UpdateStatus;
// export const exacelInsertNew = async (req: Request, res: Response) => {
//   try {
//     const excelUploads = req.body;
//     const userId = req.user?.userId;
//     const userRole = req.user?.role;
//     console.log("userId:", userId);
//     console.log("userRole:", userRole);
//     let merchant;
//     if (userRole === "User") {
//       console.log("Role is User");
//       // If the role is "User", upload the data on behalf of this user
//       merchant = await User.findById(userId);
//       console.log("User merchant:", merchant);
//     } else if (userRole === "staff") {
//       console.log("Role is staff");
//       // If the role is "staff", look for the merchant in merchantUserSchema
//       // const merchantUser = await merchantUser.findOne({ merchant: userId });
//       console.log("merchantUser:", merchatClinetSchema);
//       if (merchatClinetSchema) {
//         merchant = await merchatClinetSchema.findById(merchant);
//         console.log("Staff merchant:", merchant);
//       }
//     }
//     if (!merchant) {
//       console.log("Merchant not found");
//       return res.status(404).json({ message: "Merchant not found" });
//     }
//     // Generate voucher ID for each upload
//     for (let excelUpload of excelUploads) {
//       excelUpload.voucherId = await generateVoucherId();
//       excelUpload.merchant = merchant._id;
//     }
//     // Insert uploads into the database
//     const insertedUploads = await ExacelUpload.insertMany(excelUploads);
//     console.log("Inserted uploads:", insertedUploads);
//     // Extract status from each inserted document
//     const statuses = insertedUploads.map((upload) => upload.status);
//     console.log("statuses", statuses);
//     res.status(200).json({
//       success: true,
//       insertedUploads: insertedUploads,
//       message: "Excel Upload success",
//       statuses: statuses,
//     });
//   } catch (err) {
//     console.error("Excel Upload error: ", err);
//     res.status(500).json({ success: false, message: "internal_server_error" });
//   }
// };
// This will return Merchant voucher it's used token for merchant Id
// export const AddVoucher = async (req: Request, res: Response) => {
//   const data = req.body;
//   const userId = req.user?.userId;
//   // Find the merchant user based on the provided userId
//   const merchantUsers = await merchantUser.findById(userId).exec(); // Retrieve instance using exec()
//   if (!merchantUsers) {
//     return res.status(404).json({ message: "Merchant user not found" });
//   }
//   // Generate a unique voucher ID
//   let voucherId: number = 0;
//   let isUnique: boolean = false;
//   while (!isUnique) {
//     voucherId = Math.floor(1000000 + Math.random() * 9000000); // Generate random 7-digit number
//     const existingVoucher = await Voucher.findOne({ voucherId });
//     if (!existingVoucher) {
//       isUnique = true;
//     }
//   }
//   // Create the voucher against the merchant user
//   const voucher = await Voucher.create({
//     ...data,
//     merchant: merchantUser._id, // Convert ObjectId to string
//     voucherId,
//   });
//   res.status(201).json(voucher);
// };
// The Delete Voucher to Delete Merchant Voucher, it's used voucher id in params
