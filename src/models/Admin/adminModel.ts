import { model, Schema } from "mongoose";
import IUser from "../../types/userTypes/user";
import argon2 from "argon2";

const AdminSchema = new Schema<any>(
  {
    name: {
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
  },
  { timestamps: true }
);
// Define a pre-save middleware to hash the password before saving
AdminSchema.pre("save", async function (next) {
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
const Admin = model<any>("Admin", AdminSchema);

export default Admin;
