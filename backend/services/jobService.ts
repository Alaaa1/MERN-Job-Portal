import { ObjectId } from "mongodb";
import { Job } from "../db/mongo/Job";
import { Filters, INewJob, IEditedJobInfo } from "../types";
import UserService from "./userService";
const JobInstance = new Job();
const UserServiceInstance = new UserService();

export default class JobService {
    async getJobs({ filters = null }: { filters: Filters }) {
        try {
            const jobs = await JobInstance.getJobs({ filters });
            return jobs;
        } catch (e) {
            console.error(`Job Service: Unable to get jobs ${e}`);
            return e;
        }
    }

    async findJobById(jobId: ObjectId) {
        const result = await JobInstance.findJobById(jobId);
        return result;
    }
    async createJob(jobToCreate: INewJob) {//todo: user transaction
        try {
            const createdJob = await JobInstance.createJob(jobToCreate);
            let user = await UserServiceInstance.findUserById(jobToCreate.user_id);
            let user_jobs = user.jobs;
            user_jobs.push(createdJob._id);
            await UserServiceInstance.updateUserJobs(jobToCreate.user_id, user_jobs);
            return createdJob;
        } catch (e) {
            console.error(`Job Service: Unable to create a job ${e}`);
            return e;
        }
    }

    async editJob(jobId: ObjectId, newJobInfo: IEditedJobInfo, user_id: ObjectId) {
        try {
            const job = await this.findJobById(jobId);
            if (job.user_id == user_id) {
                const updatedJob = await JobInstance.updateJob(jobId, newJobInfo);
                return updatedJob;
            }
        } catch (e) {
            console.error(`Job Service: Unable to edit job ${e}`);
            return e;
        }
    }

    async deleteJob(jobId: ObjectId, user_id: ObjectId) {//todo: use transaction
        try {
            const job = await JobInstance.findJobById(jobId);
            if (job.user_id.toString() === user_id.toString()) {//todo: cast at the DAL layer
                const deletedJob = await JobInstance.deleteJob(jobId);
                let user = await UserServiceInstance.findUserById(user_id);
                const index = user.jobs.indexOf(jobId);
                if (index > -1) {
                    user.jobs.splice(index, 1);
                    await UserServiceInstance.updateUserJobs(user_id, user.jobs);
                }
                return deletedJob;
            }
        } catch (e) {
            console.error(`Job Service: Unable to delete job ${e}`);
            return e;
        }
    }
}