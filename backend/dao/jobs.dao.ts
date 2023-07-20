import { ObjectId } from "mongodb";
import { INewJob, ApiGetResponse, ErrorMessage, INewJobInfo, IDAOResponse, IJob } from "../types";
import Job from "../models/Job";
let jobs;

export default class JobsDAO {
    static async injectDB(conn) {
        if (jobs) {
            return;
        }
        try {
            jobs = await conn.db(process.env.DB_NAME).collection("jobs");
        } catch (e) {
            console.error(`Unable to establish connection to the database ${e}`)
        }
    }

    static async getJobs({ filters = null }: { filters: {} } = { filters: null }): Promise<ApiGetResponse> {
        let query: object;
        console.log(filters);
        if (filters) {
            if ("name" in filters) {
                query = { $text: { $search: filters["name"] } }
            }
        }
        let cursor;
        try {
            cursor = await jobs.find(query);
        } catch (e) {
            console.error(`Unable to issue the find command ${e}`)
            return { jobs: [], total_results: 0 };
        }

        try {
            const jobs: object[] = await cursor.toArray();
            const total_results: number = jobs.length;
            return { jobs, total_results };
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting document ${e}`);
            return { jobs: [], total_results: 0 };
        }
    }

    static async addJob(job: INewJob): Promise<IDAOResponse | ErrorMessage> {
        try {
            const newJob: IJob = await Job.create(
                job
            );
            const daoResponse: IDAOResponse = { job: newJob, dbResponse: true }
            return daoResponse;
        } catch (e) {
            console.error(`Jobs DAO error: Unable to insert a new job ${e}`);
            return { error: e };
        }

    }

    static async editJob(jobId: ObjectId, newJobInfo: INewJobInfo, user_id: string): Promise<IDAOResponse | ErrorMessage> {
        try {
            let job = await Job.findById(jobId).exec();
            let daoResponse: IDAOResponse;
            if (job.user_id === user_id) {
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

    static async deleteJob(jobId: ObjectId, user_id: string): Promise<IDAOResponse | ErrorMessage> {
        try {
            let job = await Job.findById(jobId).exec();
            let daoResponse: IDAOResponse;
            if (job.user_id === user_id) {
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