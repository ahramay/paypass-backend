"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.awsConfig = exports.multerUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        // no larger than 100mb.
        fileSize: 1024 * 1024 * 1024,
    },
});
exports.multerUpload = upload;
// Importing awsConfig separately
const awsConfig = {
    region: 'eu-north-1',
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
};
exports.awsConfig = awsConfig;
