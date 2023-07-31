import JobModel from "../models/JobModel";

export default class JobsRepository {
    async getJobs() {
        return await JobModel.find().lean();
    }
}