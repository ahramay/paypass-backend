import { Request, Response } from "express";
import Merchant from "../../models/Merchant/merchantModel";
import User from "../../models/User/userModel";
import {sendEmailToSuperAdmin}  from '../../emailService/emailService';
import MerchatClinet from "../../models/Merchant/MerchantClient/merchatClinet";
import merchantClientSchema, {
} from "../../validations/auth/merchantClientValidation";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";
const JWT_EXPIRY = process.env.JWT_EXPIRY || "";

export const updateMerchantStep = async (req: Request, res: Response) => {
  const stepNumber = req.params.stepNumber;
  const updateData = req.body;
  const userId = req.user?.userId;

  
  try {
    let updateField: any = {}; // Type 'any' for simplicity; consider a proper type

    switch (stepNumber) {
      case "stepOne":
        updateField = { stepOne: updateData };
        break;
      case "stepTwo":
        updateField = { stepTwo: updateData };
        break;
      case "stepThree":
        updateField = { stepThree: updateData };
        break;
      case "stepFour":
        updateField = { stepFour: updateData };
        break;
      default:
        return res.status(400).json({ message: "Invalid step number" });
    }

    const merchant = await Merchant.findOne({ user: userId }); // Use findOne instead of find

    if (!merchant) {
      return res.status(404).json({ message: "Merchant not found" });
    }
    // console.log(updateField.stepThree)

    const updatedStep = await Merchant.findByIdAndUpdate(
      merchant._id,
      updateField,
      { new: true }
    );

    if (!updatedStep) {
      return res.status(404).json({ message: "Merchant step not updated" });
    }
    if(updateField.stepFour){
        await User.findByIdAndUpdate(userId,{status:"pending"})
       // Find user to get email

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const userEmail: string = user.email;

      await sendEmailToSuperAdmin('Merchant Step Updated', 'A merchant has updated their step.', userEmail);
      console.log(user)
    }

    res.status(200).json(updatedStep);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllMerchantDetail = async (req: Request, res: Response) => {
  const merchant = await Merchant.find().populate('user');
  res.send(merchant);
};

// Get Merchant Detail
export const getMerchantDetail = async (req: Request, res: Response) => {


  const userId = req.user?.userId;
  console.log(userId);

  // Find the associated merchant
  const merchant = await Merchant.findOne({ user: userId });

  // Determine which steps have data
  const completedSteps = [];
  if (merchant) {
    if (merchant.stepOne) completedSteps.push(1);
    if (merchant.stepTwo) completedSteps.push(2);
    if (merchant.stepThree) completedSteps.push(3);
    if (merchant.stepFour) completedSteps.push(4);
  }

  // Determine the last completed step
  const lastCompletedStep = completedSteps.length > 0 ? Math.max(...completedSteps) : null;

  res.json({
    merchantInformation: merchant?.stepOne || {},
    businessDetails: merchant?.stepTwo || {},
    operationsDetails: merchant?.stepThree || {},
    bankDetails: merchant?.stepFour || {},
    completedSteps,
    lastCompletedStep,
  });
};


export const createMerchantClient = async (req: Request, res: Response) => {
  try {
    // Validate the registration data using the provided schema
    await merchantClientSchema.validate(req.body, { abortEarly: false });

    // Check if the email already exists in the User model
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ error: "Email is already registered" });
    }

    // Create a new user in the User model
    const newUser = new User({ ...req.body });
    await newUser.save();

    // Create a new Merchant Client using the same data and associate it with the merchant
    const { merchantId } = req.body;
    const newMerchantClient = new MerchatClinet({ ...req.body, user: newUser._id, merchant: merchantId });
    await newMerchantClient.save();

    // Generate JWT token for the newly registered Merchant Client
    const token = jwt.sign(
      { userId: newMerchantClient._id, role: "merchantClient" },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRY }
    );

    // Respond with success message and token
    res.status(201).json({ success: true, message: "Merchant Client successfully registered", token });
  } catch (error) {
    console.error("Error registering Merchant Client:", error);
    // Respond with validation error or server error
    res.status(400).json({ error: "Validation error" });
  }
};

export const getMerchantClient = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const merchantUsers = await MerchatClinet.find({ merchant: userId }).sort({createdAt:-1});
  res.json(merchantUsers);
};

// export const getMerchantClient = async (req: Request, res: Response) => {
//   try {
//     const { fullName, email, phone, countryCode, password } = req.body;
    
//     // Validate the request body
//     if (!fullName || !email || !phone || !countryCode || !password) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     // Check if the merchant is authenticated
//     // Assuming you have middleware for authentication
//     const merchantId = req.user.id; // Assuming you extract the merchant ID from the authenticated user
    
//     // Create the merchant client
//     const merchantClient = new MerchatClinet({
//       fullName,
//       email,
//       phone,
//       countryCode,
//       password, // Ensure to hash the password before saving
//       merchant: merchantId, // Assign the merchant ID to the client
//     });

//     await merchantClient.save();

//     res.status(201).json({ success: true, message: 'Merchant client created successfully' });
//   } catch (error) {
//     console.error('Error creating merchant client:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };