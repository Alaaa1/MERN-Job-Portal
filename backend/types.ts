import { ObjectId } from "mongodb";
export interface AddJob {
    name: string;
    datePosted: Date;
    company: string;
    category: string;
}

export interface NewJob extends AddJob {
    _id: ObjectId
}

export interface EditJob {
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
export interface DAOEditResponse {
    name: string;
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

export interface Jobs {
    _id: ObjectId;
    name: string;
    datePoseted: Date;
    company: string;
    category: string;
}