import { Document,Types } from "mongoose";

export interface iModel extends Document {
    merchant : Types.ObjectId,
    voucherId:Number,
    ChallanNo:String,
    RollNo:String,
    department:String,
    FeeType:String,
    Name:String,
    DueDate:String,
    FatherName:String,
    Total:String,
    status:String
}