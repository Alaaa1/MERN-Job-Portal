import { ObjectId } from "mongodb";
import { AddJob, ApiGetResponse, DAOPostResponse, ErrorMessage, NewJob, EditJob, DAOEditResponse, Jobs } from "../types";
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

    static async getJobs({ filters = null } = {}): Promise<ApiGetResponse> {
        let query: object;
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
            const jobs = await cursor.toArray();
            const total_results = jobs.length;
            return { jobs, total_results };
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting document ${e}`);
            return { jobs: [], total_results: 0 };
        }
    }

    static async addJob(newObject: AddJob): Promise<DAOPostResponse | ErrorMessage> {
        const newCollection: NewJob = {
            _id: new ObjectId(),
            name: newObject.name,
            datePosted: newObject.datePosted,
            company: newObject.company,
            category: newObject.category
        };
        try {
            const result = await jobs.insertOne(newCollection);
            return result;
        } catch (e) {
            console.error(`Unable to issue the insert command ${e}`);
            return { error: e };
        }
    }

    static async editJob(jobId: ObjectId, jobInfo: EditJob): Promise<DAOEditResponse | ErrorMessage> {
        try {
            const result = await jobs.updateOne({ _id: new ObjectId(jobId) }, {
                $set: {
                    name: jobInfo.name,
                    company: jobInfo.company,
                    category: jobInfo.category
                },
            });
            return result;
        } catch (e) {
            console.error(`Unable to edit the document ${e}`);
            return { error: e };
        }
    }

    static async deleteJob(jobId: string): Promise<object> {
        try {
            const result: object = await jobs.deleteOne({ _id: new ObjectId(jobId) });
            return result;
        } catch (e) {
            return { error: e }
        }
    }
}