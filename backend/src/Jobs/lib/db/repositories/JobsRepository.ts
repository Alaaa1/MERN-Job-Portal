import { IEditedJobInfo, IJob, INewJob, IRepoNewJob } from "../../../jobsTypes";
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

    async getJobById(jobId: string) {
        const result: IJob = await JobModel.findById(jobId).lean();
        return result;
    }

    async deleteJob(jobId: string) {
        const result = await JobModel.deleteOne({ _id: jobId });
        return result;
    }

    async updateJob(jobId: string, editedJobInfo: IEditedJobInfo) {
        const result = await JobModel.updateOne({ _id: jobId }, { ...editedJobInfo }).exec();
        return result;
    }
}