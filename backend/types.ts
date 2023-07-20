import { ObjectId } from "mongodb";
import { Document } from "mongoose";

export interface INewJob {
    name: string,
    datePosted: Date,
    company: string,
    category: string,
    user_id: string
}
export interface INewJobInfo {
    name: string;
    company: string;
    category: string;
}

export interface ErrorMessage {
    error: Error;
}
export interface ApiGetResponse {
    jobs: Array<object>;
    total_results: number;
}

export interface DAOPostResponse {
    _id: ObjectId;
    name: string;
    datePoseted: Date;
    company: string;
    category: string;
}
export interface DAOGetResult {
    jobs: Array<object>;
    total_results: number;
}
export interface Filters {
    name?: string;
    category?: string;
}
export interface IJob extends Document {
    name: string,
    datePosted: Date,
    company: string,
    category: string,
    user_id: string
}

export interface IControllerAddJob {
    status: string,
    dbResponse: boolean
}

export interface IDAOAddJob {
    newJob: IJob,
    dbResponse: boolean
}
export interface IDAOEditJob {
    job: IJob;
    dbResponse: boolean;
}