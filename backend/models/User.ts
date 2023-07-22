import { IUser } from './../types';
import { Schema, model } from "mongoose";

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    jobs: [{
        type: Schema.Types.ObjectId,
        ref: "Job",
    }]
})

const User = model<IUser>("User", userSchema);
export default User;