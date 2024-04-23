"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bucketFolders = exports.uploadFile = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const aws_config_1 = require("../config/aws.config");
const chat_helper_1 = require("../helpers/chat.helper");
const folders = {
    ONBOARDING_FOLDER: 'onboarding',
    CHAT_FOLDER: 'chat_media',
    PROJECT_FOLDER: 'projects',
};
exports.bucketFolders = folders;
const s3bucket = new aws_sdk_1.default.S3(aws_config_1.awsConfig);
const uploadFile = (file, folder = folders.CHAT_FOLDER) => {
    return new Promise((resolve, reject) => {
        try {
            const params = {
                Key: file.originalname,
                Body: file.buffer,
                Bucket: `paypaas/${folder}`,
                ACL: 'public-read-write',
            };
            s3bucket.upload(params, (error, data) => {
                if (error) {
                    console.log('one', error);
                    reject(error);
                }
                resolve({
                    url: data.Location,
                    fileType: (0, chat_helper_1.getFileTypeByName)(file.originalname),
                    fileName: file.originalname,
                });
            });
        }
        catch (e) {
            console.log('two', e);
            reject(e);
        }
    });
};
exports.uploadFile = uploadFile;
