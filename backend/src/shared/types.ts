import { ObjectId } from "mongodb";
import { Document } from "mongoose";

export interface IEditedJobInfo {
    name: string;
    company: string;
    category: string;
}
export interface INewUserFormInfo {
    username: string;
    email: string;
    password: string;
    role: string;//todo: specify "creator" or "seeker"
}

export interface INewUser {
    _id: ObjectId;
    username: string;
    email: string;
    hashedPassword: string;
    role: string;//todo: specify "creator" or "seeker"
}
export interface ErrorMessage {
    error: Error;
}
export interface Filters {
    name?: string;
    category?: string;
}
export interface IJob extends Document {
    name: string;
    datePosted: Date;
    company: string;
    category: string;
    user_id: ObjectId;
}

export interface IHashedUser extends Document {
    userId: ObjectId;
    hashedPassword: string;
}

export interface IControllerAddJob {
    status: string;
    dbResponse: boolean;
}
export interface IJobsDAOResponse {
    job?: IJob;
    jobs?: IJob[];
    total_results?: number;
    dbResponse: boolean;
}

export interface IUsersDAOResponse {
    user?: IUser;
    dbResponse: boolean;
    token?;
}