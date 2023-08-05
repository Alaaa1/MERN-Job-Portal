import { IUser } from "../../../userTypes";
import { UserEntity } from "../../entities/UserEnitity";
import { UserMappers } from "../../mappers/UserMappers";
import UserModel from "../models/UserModel";

export class UsersRepository {
    userMappers: UserMappers

    constructor(userMappers: UserMappers) {
        this.userMappers = userMappers;
    }

    async findUserById(userId: string): Promise<UserEntity | null> {
        const result: IUser = await UserModel.findById(userId).lean();
        const { username, email, hashedPassword, jobs, role } = result;
        const id = userId;
        return this.userMappers.toDomain({ id, username, email, hashedPassword, jobs, role });
    }

    async updateUserJobs(userId: string, newJobs: string[]) {
        const result = await UserModel.findOneAndUpdate({ _id: userId }, { jobs: newJobs }).exec();
        const { username, email, hashedPassword, jobs, role } = result;
        const id = userId;
        return this.userMappers.toDomain({ id, username, email, hashedPassword, jobs, role });
    }
}