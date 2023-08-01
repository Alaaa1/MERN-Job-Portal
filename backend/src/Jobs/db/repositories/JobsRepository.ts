import { INewJob, IRepoNewJob } from "../../jobsTypes";
import JobModel from "../models/JobModel";

export default class JobsRepository {

    async getJobs() {
        return await JobModel.find().lean();
    }

    async createJob(newJob: INewJob) {
        let jobToCreate: IRepoNewJob = {
            ...newJob,
            datePosted: new Date()
        };

        const result = await JobModel.create(jobToCreate);
        return result;
    }
}