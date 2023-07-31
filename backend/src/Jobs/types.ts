import { ObjectId } from "mongodb";

export interface IJob extends Document {
    name: string;
    datePosted: Date;
    company: string;
    category: string;
    user_id: ObjectId;
}