import { Request, Response } from "express";
import Merchant from "../../models/Merchant/merchantModel";
import User from "../../models/User/userModel";
import {sendEmailToSuperAdmin}  from '../../emailService/emailService';
import MerchatClinet from "../../models/Merchant/MerchantClient/merchatClinet";
import merchantClientSchema, {
} from "../../validations/auth/merchantClientValidation";
import jwt from "jsonwebtoken";
import { bucketFolders,uploadFile } from '../../services/aws.service';
import VoucherFields from "../../models/Merchant/voucher/voucherFields";
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

      // const userEmail: string = user.email;

      // await sendEmailToSuperAdmin('Merchant Step Updated', 'A merchant has updated their step.', userEmail);
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
// --------------------Merchant Client---------------------------------------

export const createMerchantClient = async (req: Request, res: Response) => {
  try {
      const userId = req.user?.userId
    // Validate the registration data using the provided schema
    await merchantClientSchema.validate(req.body, { abortEarly: false });

    // Check if the email already exists in the User model
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ error: "Email is already registered" });
    }

    
    const newUser = new User({ ...req.body ,role: "staff", merchant: userId});
    await newUser.save();
    
    console.log("merchantId",userId)
    const newMerchantClient = new MerchatClinet({ ...req.body, user: newUser._id, merchant: userId });
    console.log("ssddsd",newMerchantClient)
    await newMerchantClient.save();

    // Generate JWT token for the newly registered Merchant Client
    const token = jwt.sign(
      { userId: newMerchantClient._id, role: "staff" },
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

export const updateMerchantClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Get the merchant client ID from the request params

    // Validate the update data using the provided schema
    await merchantClientSchema.validate(req.body, { abortEarly: false });

    // Find the existing Merchant Client by ID
    const existingMerchantClient = await MerchatClinet.findById(id);
    if (!existingMerchantClient) {
      return res.status(404).json({ error: "Merchant Client not found" });
    }

    // Update the Merchant Client data
    await MerchatClinet.findByIdAndUpdate(id, req.body);

    // Respond with success message
    res.status(200).json({ success: true, message: "Merchant Client successfully updated" });
  } catch (error) {
    console.error("Error updating Merchant Client:", error);
    // Respond with validation error or server error
    res.status(400).json({ error: "Validation error" });
  }
};

export const deleteMerchantClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Get the merchant client ID from the request params

    // Find the existing Merchant Client by ID
    const existingMerchantClient = await MerchatClinet.findById(id);
    if (!existingMerchantClient) {
      return res.status(404).json({ error: "Merchant Client not found" });
    }

    // Delete the Merchant Client
    await MerchatClinet.findByIdAndDelete(id);

    // Delete the associated user
    await User.findByIdAndDelete(existingMerchantClient.user);
    // await User.findOne(existingMerchantClient.email)

    // Respond with success message
    res.status(200).json({ success: true, message: "Merchant Client successfully deleted" });
  } catch (error) {
    console.error("Error deleting Merchant Client:", error);
    // Respond with validation error or server error
    res.status(400).json({ error: "Validation error" });
  }
};


// export const updateUserProfilePic = async (req: Request, res: Response) => {
//   try {
//     const userId = req.user?.userId;
//     const file = req.file;
//     console.log("user",userId)
//     if (!file) {
//       return res.status(400).send('Invalid request');
//     }

//     // Upload file to S3
//     const path = await uploadFile(file, bucketFolders.ONBOARDING_FOLDER);

//     // Get user by ID
//     const merchant = await Merchant.findOne({ user: userId });
//     console.log("user",merchant)
//     // Handle case where merchant is null
//     if (!merchant) {
//       return res.status(404).send('Merchant not found');
//     }

//     // Update merchant profile picture URL
//     merchant.profilePic = path.url;

//     // Save merchant changes
//     await merchant.save();

//     // Respond with success message
//     res.status(200).send('Profile picture updated successfully');
//   } catch (error) {
//     console.error('Error updating profile picture:', error);
//     res.status(500).send('Internal server error');
//   }
// };


export const fileInsert = async (req: Request, res: Response): Promise<void> => {
  try {
    const voucherFields: any[] = req.body;

    const docs = await VoucherFields.insertMany(voucherFields);

    if (docs) {
      res.status(200).json({ success: true, message: "file upload success",docs });
    } else {
      res.status(400).json({
        success: false,
        message: "file upload failed",
      });
    }
  } catch (err: any) {
    console.error("file upload error: ", err);
    res.status(500).json({ success: false, message: "internal_server_error" });
  }
};

export const fileUpdate = async (req: Request, res: Response): Promise<void> => {
  try {
    const VoucherField: any[] = req.body; 

    const promises = VoucherField.map(async (item) => {
      const updatedItem = await VoucherFields.findByIdAndUpdate(item._id, {
        $set: { ...item },
      });

      return updatedItem;
    });

    Promise.all(promises)
      .then(() =>
        res.json({ success: true, message: "file upload success" })
      )
      .catch((err) => res.status(400).json(err));
  } catch (err: any) {
    console.error("file upload error: ", err);
    res.status(500).json({ success: false, message: "internal_server_error" });
  }
};

export const getUserDetails = async (req: Request, res: Response): Promise<any> => {
  const userId = req.user?.userId; // Assuming your decoded JWT payload has userId

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: `Error fetching user details: ${error.message}` });
  }
};