import mongoose from "mongoose";
import { MerchatClinet } from "../../../types/merchantTypes/merchantClinet/merchantClinet";
import argon2 from "argon2";

const merchatClinetSchema = new mongoose.Schema<MerchatClinet>(
  {
    merchant:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Merchant', 
        required:false
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    role:{
      type:String,
      enum: ['merchantClient'],
      default:'merchantClient'
    }

  },
  { timestamps: true }
);
// Define a pre-save middleware to hash the password before saving
merchatClinetSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const hashedPassword = await argon2.hash(this.password);
    this.password = hashedPassword;
    return next();
  } catch (error: any) {
    return next(error);
  }
});
const MerchatClinet = mongoose.model("MerchatClinet", merchatClinetSchema);

export default MerchatClinet;
