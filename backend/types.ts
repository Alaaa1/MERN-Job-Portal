import { ObjectId } from "mongodb";
import { Document } from "mongoose";

export interface INewJob {
    name: string,
    datePosted: Date,
    company: string,
    category: string,
    user_id: ObjectId
}
export interface INewJobInfo {
    name: string;
    company: string;
    category: string;
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

export interface IUser extends Document {
    username: string;
    hashedPassword: string;
    email: string;
    role: string;
    jobs?: ObjectId[];
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