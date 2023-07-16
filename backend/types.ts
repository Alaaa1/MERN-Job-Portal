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