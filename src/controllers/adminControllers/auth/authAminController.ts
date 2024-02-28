import { Request, Response } from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import Admin from "../../../models/Admin/adminModel";
import { SignInValidationSchema } from "../../../validations/auth/authValidation";

const JWT_SECRET = process.env.JWT_SECRET || "";
const JWT_EXPIRY = process.env.JWT_EXPIRY || "";
// Register User
export const registerAdmin = async (req: Request, res: Response) => {
  const { email } = req.body;

  // await registrationSchema.validate(req.body, { abortEarly: false });

  // Check if the user already exists
  const existingUser = await Admin.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ error: "User already exists" });
  }
  // Create and save the new user
  const newUser = new Admin({ ...req.body });
  await newUser.save();

  res
    .status(201)
    .json({ success: true, message: "User Success Fully Registered" });
};

// Login User
export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  await SignInValidationSchema.validate(req.body, { abortEarly: false });

  // Find the user by email
  const user = await Admin.findOne({ email });

  // If the user is not found or the password doesn't match, return an error
  if (!user || !(await argon2.verify(user.password, password))) {
    return res.status(403).json({ error: "Invalid credentials" });
  }

  // Generate a JWT token
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRY,
  });

  res.json({
    token,
    user: {
      name: user.name,
    },
  });
};
