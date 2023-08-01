import { Schema, model } from "mongoose";
import { IUser } from "../../userTypes";

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    hashedPassword: {//todo separate into new schema
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

const UserModel = model<IUser>("User", userSchema);
export default UserModel;