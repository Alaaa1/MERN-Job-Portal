import { ObjectId } from "mongodb";

export interface IJob extends Document {
    name: string;
    datePosted: Date;
    company: string;
    category: string;
    user_id: ObjectId;
}

export interface INewJob {
    name: string;
    company: string;
    category: string;
    user_id: ObjectId;
}

export interface IRepoNewJob extends INewJob {
    datePosted: Date;
}

export interface IEditedJobInfo {
    name: string;
    company: string;
    category: string;
}