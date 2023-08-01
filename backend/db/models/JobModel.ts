import { Schema, model } from "mongoose";
import { IJob } from "../../src/shared/types";

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
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const JobModel = model<IJob>("Job", jobSchema);
export default JobModel;