"use strict";
// errorHandler.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const errorHandler = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        const errors = {};
        // Handle Yup validation errors
        if (err.inner) {
            err.inner.forEach((validationError) => {
                const { path, message } = validationError;
                errors[path] = message;
            });
        }
        // Handle Mongoose validation errors
        if (err.errors) {
            for (let field in err.errors) {
                const error = err.errors[field];
                if (error instanceof mongoose_1.default.Error.CastError) {
                    const path = error.path;
                    const kind = error.kind;
                    errors[field] = `${path} must be ${kind}`;
                }
                else {
                    errors[field] = error.message;
                }
            }
        }
        return res.status(422).json({ errors });
    }
    // Handle other generic errors
    res.status(err.status || 500);
    res.json(err.message);
};
exports.default = errorHandler;
