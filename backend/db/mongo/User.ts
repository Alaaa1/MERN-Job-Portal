import { ObjectId } from "mongodb";
import UserModel from "../models/UserModel";
import { INewUser } from "../../src/shared/types";

export class User {

    async findUserById(user_id: ObjectId) {
        const result = await UserModel.findById(user_id).lean();
        return result;
    }

    async findUserByEmail(email: string) {
        const result = await UserModel.findOne({ email }).lean();
        return result;
    }

    async updateUserJobs(user_id: ObjectId, newJobs: []) {
        const result = await UserModel.updateOne({ _id: user_id }, { jobs: newJobs }).exec();
        return result;
    }

    async createUser(user: INewUser) {
        const result = await UserModel.create(user);
        return result;
    }
}