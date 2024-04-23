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
exports.addUser = void 0;
const merchantuserModel_1 = __importDefault(require("../../../models/Merchant/merchantuser/merchantuserModel"));
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const merchantUsers = yield merchantuserModel_1.default.create(Object.assign(Object.assign({}, data), { merchant: userId }));
    res.status(201).json(merchantUsers);
});
exports.addUser = addUser;
