"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database_1 = __importDefault(require("./config/database"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
//* Initialization *//
//.................................................................../
const PORT = process.env.PORT || 8140;
//* Express and Third party Middleware *//
//.................................................................../
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
//* Routes and API Declaration *//
//.................................................................../
app.use('/api/v1', routes_1.default);
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/merchant',merchantRoutes)
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
//* MongoDB Connection *//
//.................................................................../
(0, database_1.default)();
//! Alert: Error Handler must in Last,Then it's worked
//* Custom Async Error handler Middleware *//
app.use(errorHandler_1.default);
//< Running Server
//.................................................................../
app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}/`); });
