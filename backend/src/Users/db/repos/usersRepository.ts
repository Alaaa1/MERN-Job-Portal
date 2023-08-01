import UserModel from "../models/UserModel";

export class UserRepository {

    async findUserById(userId: string) {
        const result = await UserModel.findById(userId).lean();
        return result;
    }

    async updateUserJobs(userId: string, newJobs: object[]) {
        const result = await UserModel.updateOne({ _id: userId }, { jobs: newJobs }).exec();
        return result;
    }
}