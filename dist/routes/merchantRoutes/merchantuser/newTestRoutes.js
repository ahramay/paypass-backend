"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../../../middlewares/authMiddleware");
const newTestingController_1 = require("../../../controllers/merchantControllers/merchatuser/newTestingController");
const router = express_1.default.Router();
// create new merchantUser
router.post("/", newTestingController_1.addUser);
router.use(authMiddleware_1.authMiddleware);
exports.default = router;
