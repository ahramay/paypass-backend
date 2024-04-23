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
exports.sendEmailToSuperAdmin = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const { SMTP_HOST, SMTP_MAIL, SMTP_PASSWORD } = process.env;
// Function to send email to super admin
function sendEmailToSuperAdmin(subject, text, userEmail) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Configure Nodemailer
            const transporter = nodemailer_1.default.createTransport({
                host: SMTP_HOST,
                port: 465,
                secure: true,
                auth: {
                    user: SMTP_MAIL,
                    pass: SMTP_PASSWORD, // replace with your email password
                },
            });
            // Define email options
            const mailOptions = {
                from: userEmail,
                to: 'ahmad.ramay4@gmail.com',
                subject: "onBording Request",
                text: "User onBording Request approved it" // Plain text body
            };
            // Send email
            yield transporter.sendMail(mailOptions);
            console.log('Email sent to super admin');
        }
        catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send email');
        }
    });
}
exports.sendEmailToSuperAdmin = sendEmailToSuperAdmin;
