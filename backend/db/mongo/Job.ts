import JobModel from "../models/JobModel";
import { IJob, INewJob, IEditedJobInfo } from "../../types";
import { ObjectId } from "mongodb";

export class Job {

    async getJobs({ filters }) {
        const result = await JobModel.find(filters).exec()//todo use lean() instead of exec();
        return result;
    }

    async findJobById(jobId: ObjectId) {
        const result = await JobModel.findById(jobId).exec();
        return result;
    }

    async createJob(jobToCreate: INewJob) {
        const result: IJob = await JobModel.create(jobToCreate);
        return result;
    }

    async updateJob(jobId: ObjectId, newJobInfo: IEditedJobInfo) {
        const result = await JobModel.updateOne({ _id: jobId }, { ...newJobInfo }).exec();
        return result;
    }

    async deleteJob(jobId: ObjectId) {
        const result = await JobModel.findByIdAndDelete(jobId).exec();
        return result;
    }
}