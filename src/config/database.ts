import mongoose from "mongoose";
const DATABASE_URI = process.env.DATABASE_URI || "";
const connectDB = async () => {
  mongoose
    .connect(DATABASE_URI)
    .then(() =>
      console.log(
        `Connected to Host: ${mongoose.connection.host} Name: ${mongoose.connection.name}`
      )
    )
    .catch((err: any) => console.log(err));
};

export default connectDB;
