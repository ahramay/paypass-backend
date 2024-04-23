"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPercentage = exports.verifyAnswersByTypes = exports.getFileTypeByName = exports.formatMessage = void 0;
const moment_1 = __importDefault(require("moment"));
const formatMessage = (conversation, currentLoggedUser) => {
    var _a, _b, _c, _d;
    return Object.assign(Object.assign({}, conversation._doc), { myMessage: String((_a = conversation._doc.sender) === null || _a === void 0 ? void 0 : _a._id) === String(currentLoggedUser), username: (_c = (_b = conversation === null || conversation === void 0 ? void 0 : conversation._doc) === null || _b === void 0 ? void 0 : _b.sender) === null || _c === void 0 ? void 0 : _c.name, time: (0, moment_1.default)((_d = conversation === null || conversation === void 0 ? void 0 : conversation._doc) === null || _d === void 0 ? void 0 : _d.createdAt).fromNow(), companyName: 'Test company', seen: true });
};
exports.formatMessage = formatMessage;
const getFileTypeByName = (fileName) => {
    var _a, _b, _c;
    return ((_c = (_b = (_a = fileName === null || fileName === void 0 ? void 0 : fileName.split) === null || _a === void 0 ? void 0 : _a.call(fileName, '.')) === null || _b === void 0 ? void 0 : _b.pop) === null || _c === void 0 ? void 0 : _c.call(_b)) || 'Unknown';
};
exports.getFileTypeByName = getFileTypeByName;
const verifyAnswersByTypes = ({ answer, type }) => {
    if (type === 'multiple') {
        // must be a number
        return !isNaN(answer);
    }
    if (type === 'checkbox') {
        // must be an array
        let result = false;
        if (Array.isArray(answer)) {
            result = true;
            // check if every answer in array is a number
            if (!answer.every((ans) => !isNaN(ans))) {
                result = false;
            }
        }
        return true;
    }
    if (type === 'shortAnswer') {
        return typeof answer === 'string';
    }
    return false;
};
exports.verifyAnswersByTypes = verifyAnswersByTypes;
const getPercentage = (total, count) => {
    console.log('will be ', (count * 100) / total || 0);
    return Math.round((count * 100) / total || 0);
};
exports.getPercentage = getPercentage;
