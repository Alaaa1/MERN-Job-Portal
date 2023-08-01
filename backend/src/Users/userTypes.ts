import { ObjectId } from "mongoose";

export interface IUser extends Document {
    username: string;
    hashedPassword: string;
    email: string;
    role: string;
    jobs?: ObjectId[];
}