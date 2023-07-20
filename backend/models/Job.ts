import { Schema, model } from "mongoose";
import { IJob } from "../types";

const jobSchema = new Schema<IJob>({
    name: {
        type: String,
        required: true
    },
    datePosted: {
        type: Date,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
});

const Job = model<IJob>("Job", jobSchema);
export default Job;