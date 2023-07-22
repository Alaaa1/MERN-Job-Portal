import { ObjectId } from "mongodb";
import { INewJob, ErrorMessage, INewJobInfo, IJobsDAOResponse, IJob } from "../types";
import Job from "../models/Job";
import User from "../models/User";

export default class JobsDAO {
    static async getJobs({ filters = null }: { filters: {} } = { filters: null }): Promise<IJobsDAOResponse | ErrorMessage> {
        let query: object = filters;
        console.log(filters);
        try {
            const jobs = await Job.find(query).exec();
            const total_results: number = jobs.length;
            const doaReponse: IJobsDAOResponse = { jobs: jobs, total_results: total_results, dbResponse: true };
            return doaReponse;
        } catch (e) {
            console.error(`Unable to issue the find command ${e}`)
            return { error: e };
        }
    }

    static async addJob(job: INewJob): Promise<IJobsDAOResponse | ErrorMessage> {
        try {
            const newJob: IJob = await Job.create(job);
            const usersDaoResponse = await User.findById(newJob.user_id);
            const jobs = usersDaoResponse.jobs;
            jobs.push(newJob._id);
            const user = await User.updateOne({ _id: newJob.user_id }, { jobs: jobs });
            console.log("doa response", usersDaoResponse);
            console.log("user", user);
            const daoResponse: IJobsDAOResponse = { job: newJob, dbResponse: true };
            return daoResponse;
        } catch (e) {
            console.error(`Jobs DAO error: Unable to insert a new job ${e}`);
            return { error: e };
        }

    }

    static async editJob(jobId: ObjectId, newJobInfo: INewJobInfo, user_id: ObjectId): Promise<IJobsDAOResponse | ErrorMessage> {
        try {
            let job = await Job.findById(jobId).exec();
            let daoResponse: IJobsDAOResponse;
            if (job.user_id == user_id) {
                job.name = newJobInfo.name;
                job.company = newJobInfo.company;
                job.category = newJobInfo.category;
                await job.save();
                daoResponse = { job, dbResponse: true }
                return daoResponse;
            }
            daoResponse = { job, dbResponse: false }
            return daoResponse;
        } catch (e) {
            console.error(`Unable to edit the document ${e}`);
            return { error: e };
        }
    }

    static async deleteJob(jobId: ObjectId, user_id: ObjectId): Promise<IJobsDAOResponse | ErrorMessage> {
        try {
            let job = await Job.findById(jobId).exec();
            let daoResponse: IJobsDAOResponse;
            if (job.user_id == user_id) {
                job = await Job.findOneAndDelete({ _id: jobId }).exec();
                daoResponse = { job, dbResponse: true };
                return daoResponse;
            }
            daoResponse = { job, dbResponse: false };
            return daoResponse;
        } catch (e) {
            console.error(`Unable to delete the document ${e}`);
            return { error: e }
        }
    }
}