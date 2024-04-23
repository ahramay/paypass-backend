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
exports.deleteMerchantUser = exports.addMerchantUser = exports.getMerchantUser = void 0;
const merchantuserModel_1 = __importDefault(require("../../../models/Merchant/merchantuser/merchantuserModel"));
// This will return Merchant MerchantUser it's used token for merchant Id
const getMerchantUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const merchantUsers = yield merchantuserModel_1.default.find({ merchant: userId }).sort({ createdAt: -1 });
    res.json(merchantUsers);
});
exports.getMerchantUser = getMerchantUser;
// This Controller add new MerchantUser For merchant, it,s used token for merchant id
const addMerchantUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const data = req.body;
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId;
    const merchantUsers = yield merchantuserModel_1.default.create(Object.assign(Object.assign({}, data), { merchant: userId }));
    res.status(201).json(merchantUsers);
});
exports.addMerchantUser = addMerchantUser;
// The Delete MerchantUser to Delete Merchant MerchantUser, it's used MerchantUser id in params
const deleteMerchantUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const merchantUsersId = req.params.merchantUsersId;
    const existingMerchantUsers = yield merchantuserModel_1.default.findByIdAndDelete(merchantUsersId);
    if (!existingMerchantUsers) {
        return res.status(404).json({
            success: false,
            message: "MerchantUser Not Found",
        });
    }
    res.json({
        success: true,
        message: "MerchantUser Success fully Deleted",
    });
});
exports.deleteMerchantUser = deleteMerchantUser;
