import { model, Schema } from "mongoose";
import IUser from "../../types/userTypes/user";
import argon2 from "argon2";

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
    },
    organizationName: {
      type: String,
    },
    cnic: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    countryCode: {
      type: String,
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
    role:{
      type:String,
      enum: ['SuperAdmin', 'admin', 'staff', 'User'],
      default:'User'
    },
    stepCount:{
    type:Number,
    default:0,
    },
    profileCompeleted:{
      type:String,
      default:"0%",
    },
    status:{
      type:String,
      // enum:['onboarding','pending','approved'],
      enum: ['active', 'pending', 'onboarding', 'blocked', 'rejected',],
      default:'onboarding'
    }
  },
  { timestamps: true }
);
// Define a pre-save middleware to hash the password before saving
userSchema.pre("save", async function (next) {
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
const User = model<IUser>("User", userSchema);

export default User;
