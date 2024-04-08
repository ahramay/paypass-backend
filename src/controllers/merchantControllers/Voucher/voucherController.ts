import { Request, Response } from "express";
import Voucher from "../../../models/Merchant/voucher/voucherModel";
import merchantUser from "../../../models/Merchant/merchantuser/merchantuserModel";
import { ExacelUpload } from "../../../utils/models";
import { Document } from 'mongoose';
import Merchant from "../../../models/Merchant/merchantModel";
import User from "../../../models/User/userModel";
// This will return Merchant voucher it's used token for merchant Id
export const getMerchantVoucher = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const vouchers = await Voucher.find({ merchant: userId }).sort({createdAt:-1});
  res.send(vouchers);
};


// export const AddVoucher = async (req: Request, res: Response) => {
//   const data = req.body;
//   const userId = req.user?.userId;

//   // Find the merchant user based on the provided userId
//   const merchantUsers = await merchantUser.findById(userId).exec(); // Retrieve instance using exec()
//   if (!merchantUsers) {
//     return res.status(404).json({ message: "Merchant user not found" });
//   }

//   // Generate a unique voucher ID
//   let voucherId: number = 0;
//   let isUnique: boolean = false;
//   while (!isUnique) {
//     voucherId = Math.floor(1000000 + Math.random() * 9000000); // Generate random 7-digit number
//     const existingVoucher = await Voucher.findOne({ voucherId });
//     if (!existingVoucher) {
//       isUnique = true;
//     }
//   }

//   // Create the voucher against the merchant user
//   const voucher = await Voucher.create({
//     ...data,
//     merchant: merchantUser._id, // Convert ObjectId to string
//     voucherId,
//   });

//   res.status(201).json(voucher);
// };

export const AddVoucher = async (req: Request, res: Response) => {
  const data = req.body;
  const userId = req.user?.userId;

  // Create the voucher with the generated ID
  const voucher = await Voucher.create({ ...data, merchant: userId});
  res.status(201).json(voucher);
};

// The Delete Voucher to Delete Merchant Voucher, it's used voucher id in params
export const deleteVoucher = async (req: Request, res: Response) => {
  const voucherId = req.params.voucherId;

  const existingVoucher = await Voucher.findByIdAndDelete(voucherId);

  if (!existingVoucher) {
    return res.status(404).json({
      success: false,
      message: "Voucher Not Found",
    });
  }

  res.json({
    success: true,
    message: "Voucher Success fully Deleted",
  });
};



const generateVoucherId = async (): Promise<number> => {
  let voucherId = 0; // Initialize with a default value

  // Generate a unique 7-digit voucher ID
  let isUnique = false;
  while (!isUnique) {
    voucherId = Math.floor(1000000 + Math.random() * 9000000); // Generate random 7-digit number
    const existingVoucher = await ExacelUpload.findOne({ voucherId });
    if (!existingVoucher) {
      isUnique = true;
    }
  }
  return voucherId;
};


export const exacelInsert = async (req: Request, res: Response) => {
  try {
    const excelUploads = req.body;
    const userId = req.user?.userId;
    console.log("userId:", userId);
    const merchant = await User.findOne({ user: userId });
    console.log("dd",merchant)
    
    if (!merchant) {
      return res.status(404).json({ message: "Merchant not found" });
    }
    // Generate voucher ID for each upload
    for (let excelUpload of excelUploads) {
      excelUpload.voucherId = await generateVoucherId();
      excelUpload.merchant = merchant._id;
    }

    // Insert uploads into the database
    const insertedUploads = await ExacelUpload.insertMany(excelUploads);

    // Extract status from each inserted document
    const statuses = insertedUploads.map((upload) => upload.status);
    console.log("st",statuses)
    res.status(200).json({
      success: true,
      insertedUploads: insertedUploads,
      message: "Excel Upload success",
      statuses: statuses,
    });
  } catch (err) {
    console.error("Excel Upload error: ", err);
    res.status(500).json({ success: false, message: "internal_server_error" });
  }
};

export const exacelUpdate = async (req: Request, res: Response) => {
  try {
    const ExacelUploads = req.body;

    // Generate voucher ID for each ExacelUpload (if voucher ID is not provided)
    for (let ExacelUpload of ExacelUploads) {
      if (!ExacelUpload.voucherId) {
        ExacelUpload.voucherId = await generateVoucherId(); // Generate unique voucher ID
      }
    }

    // Update ExacelUploads in the database
    const promises = ExacelUploads.map(async (item: any) => {
      const updatedExacelUpload = await ExacelUpload.findByIdAndUpdate(item._id, {
        $set: { ...item },
      });
      return updatedExacelUpload;
    });

    // Wait for all update operations to complete
    Promise.all(promises)
      .then(() => res.json({ success: true, message: "Exacel Upload success" }))
      .catch((err) => res.status(400).json(err));
  } catch (err) {
    console.error("Exacel Upload error: ", err);
    res.status(500).json({ success: false, message: "internal_server_error" });
  }
};

export const getExacel = async (req: Request, res: Response) => {
  try {
    // Extract query parameters from the request
    const query = req.query || {};
     const userId = req.user?.userId;
    // Find documents based on the query
    const merchant = await User.findOne({ user: userId });
    console.log(merchant)
    const result = await ExacelUpload.find({merchant:merchant}).sort({createdAt:-1});
    // Send the response with the found documents
    res.status(200).json(result);
  } catch (error) {
    // Handle errors
    console.error("Error in getMerchantVoucher:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};