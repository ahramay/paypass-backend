import { Request, Response } from "express";
import Merchant from "../../models/Merchant/merchantModel";
import User from "../../models/User/userModel";

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
      const user =  await User.findByIdAndUpdate(userId,{status:"pending"})
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

