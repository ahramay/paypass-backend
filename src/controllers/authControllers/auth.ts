/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 29/05/2024 - 20:02:24
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 29/05/2024
    * - Author          : 
    * - Modification    : 
**/
import { Request, Response } from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import User from "../../models/User/userModel";
import ResetToken from "../../models/User/resetToken";
import Merchant from "../../models/Merchant/merchantModel";
import registrationSchema, {
  SignInValidationSchema,
} from "../../validations/auth/authValidation";

import MerchatClinet from "../../models/Merchant/MerchantClient/merchatClinet";




const JWT_SECRET = process.env.JWT_SECRET || "";
const JWT_EXPIRY = process.env.JWT_EXPIRY || "";
// Register User
export const registerUser = async (req: Request, res: Response) => {
  const { email } = req.body;

  await registrationSchema.validate(req.body, { abortEarly: false });

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ error: "User already exists" });
  }
  // Create and save the new user
  const newUser = new User({ ...req.body });
  await newUser.save();
  const newMerchant = new Merchant({ user: newUser._id });
  await newMerchant.save();
  res
    .status(201)
    .json({ success: true, message: "User Success Fully Registered" });
};

//update user

// export const updateUser = async (req: Request, res: Response) => {
//   // const { email, status } = req.body;
//   let { stepCount, profileCompeleted ,  email, status} = req.body;

//   try {
//       // Find the existing user
//       const existingUser = await User.findOne({ email });

//       // If user does not exist, return error
//       if (!existingUser) {
//           return res.status(409).json({ error: "User Not Found" });
//       }

//       // Update stepCount
  
//           // Convert stepCount to number and increment by 1
//           // stepCount = parseInt(stepCount, 10) + 1;
//           console.log("stepCount:",stepCount)

//       // Update profileCompeleted based on conditions
//       if (profileCompeleted === "0%") {
//         profileCompeleted = "25%";
//     } else if (profileCompeleted === "25%") {
//         profileCompeleted = "50%";
//     } else if (profileCompeleted === "50%") {
//         profileCompeleted = "75%";
//     } else if (profileCompeleted === "75%") {
//         profileCompeleted = "100%";
//     } else {
//         // Default to "25%" if the current value is not recognized
//         profileCompeleted = "25%";
//     }

//     if (stepCount === 0) {
//       stepCount = 1;
//   } else if (stepCount === 1) {
//     stepCount = 2;
//   } else if (stepCount === 2) {
//     stepCount = 3;
//   } else if (stepCount === 3) {
//     stepCount =4;
//   } else {
//       // Default to "25%" if the current value is not recognized
//       stepCount = 1;
//   }

//       // Update the user with new status, stepCount, and profileCompeleted
//       const updatedUser = await User.findOneAndUpdate(
//           { email },
//           { 
//               status: "active",
//               stepCount,
//               profileCompeleted
//           },
//           { new: true } // Return the updated user
//       );

//       console.log("existingUser-updated:", updatedUser);

//       // Send response
//       res.status(200).json({ message: "User updated successfully", user: updatedUser });

//   } catch (error) {
//       console.error('Error updating user:', error);
//       res.status(500).json({ error: "Internal Server Error" });
//   }
// };

export const updateUser = async (req: Request, res: Response) => {
  const { email, status, stepCount, profileCompeleted } = req.body;

  try {
      // Find the existing user
      const existingUser = await User.findOne({ email });

      // If user does not exist, return error
      if (!existingUser) {
          return res.status(409).json({ error: "User Not Found" });
      }

      // Update the user with new status, stepCount, and profileCompeleted
      const updatedUser = await User.findOneAndUpdate(
          { email },
          {
              status: "active",
              stepCount,
              profileCompeleted
          },
          { new: true } // Return the updated user
      );

      console.log("existingUser-updated:", updatedUser);

      // Send response
      res.status(200).json({ message: "User updated successfully", user: updatedUser });

  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};


// Login User
// Login User
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  await SignInValidationSchema.validate(req.body, { abortEarly: false });

  // Find the user by email
  const user = await User.findOne({ email });
  
  // If the user is not found or the password doesn't match, return an error
  if (!user || !(await argon2.verify(user.password, password))) {
    return res.status(403).json({ error: "Invalid credentials" });
  }
  
  // Find the associated merchant
  const merchant = await Merchant.findOne({ user: user._id });
 
  // Check if the user is a Merchant Client
  const merchantClient = await MerchatClinet.findOne({ user: user._id });
  if (merchantClient) {
    // If a Merchant Client is found, attempt to log in
    const validPassword = await argon2.verify(merchantClient.password, password);
    if (validPassword) {
      // If password is valid, generate JWT token for Merchant Client
      const token = jwt.sign(
        {
          user: {
            name: user.fullName,
            organizationName: user.organizationName,
            status: user.status,
            role: user.role,
            email:user.email
          },
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRY }
      );
      return res.status(200).json({ token, role: "merchantClient", user });
    }
  }

  // Check which steps have data
  const completedSteps = [];
  if (merchant) {
    if (merchant.stepOne) completedSteps.push(1);
    if (merchant.stepTwo) completedSteps.push(2);
    if (merchant.stepThree) completedSteps.push(3);
    if (merchant.stepFour) completedSteps.push(4);
  }

  // Determine the last completed step and the next step
  const lastCompletedStep =
    completedSteps.length > 0 ? Math.max(...completedSteps) : null;
  const nextStepNumber = lastCompletedStep !== null ? lastCompletedStep + 1 : 1;
  const totalSteps = 4; // Assuming there are four steps in total

  // Generate a JWT token
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRY,
  });

  res.json({
    token,
    user: {
      name: user.fullName,
      organizationName: user.organizationName,
      status: user.status,
      role: user.role,
      email: user.email
    },
    completedSteps,
    lastCompletedStep,
    nextStepNumber,
    totalSteps,
  });
};

// Forgot Password
export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Generate a reset token (you can use a library like crypto or uuid)
    const resetToken = generateResetToken();
    const tokenExpiration = new Date();
    tokenExpiration.setHours(tokenExpiration.getHours() + 2); // Expire in 2 hours

    // Create and save the reset token using the ResetToken model
    const resetTokenEntry = new ResetToken({
      userId: user._id,
      token: resetToken,
      expiresAt: tokenExpiration,
    });
    await resetTokenEntry.save();

    // Send an email with a link containing the resetToken
    // This step depends on your email sending setup

    res.json({ message: "Reset token sent to your email" });
  } catch (error) {
    res.status(500).json({ error: "Forgot password failed" });
  }
};

// Reset Password
export const resetPassword = async (req: Request, res: Response) => {
  const { resetToken, newPassword } = req.body;

  try {
    // Find the reset token in the ResetToken model
    const resetTokenEntry = await ResetToken.findOne({ token: resetToken });

    if (!resetTokenEntry) {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }

    if (resetTokenEntry.expiresAt < new Date()) {
      return res.status(400).json({ error: "Reset token has expired" });
    }

    const user = await User.findById(resetTokenEntry.userId);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Hash the new password using argon2
    const hashedPassword = await argon2.hash(newPassword);

    // Update the user's password and remove the reset token
    user.password = hashedPassword;
    await user.save();

    // Remove the reset token entry
    await ResetToken.deleteOne({ _id: resetTokenEntry._id });

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ error: "Password reset failed" });
  }
};

// Generate Token
const generateResetToken = () => {
  const token = randomBytes(32).toString("hex"); // Generate a 32-character hex token
  return token;
};

const getUserById = async (userId: string) => {
  // Your implementation here
};

