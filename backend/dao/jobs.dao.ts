import { ObjectId } from "mongodb";
let jobs;

interface AddJob {
    name: string;
    datePosted: Date;
    company: string;
    category: string;
}

interface NewJob extends AddJob {
    _id: ObjectId
}

interface EditJob {
    name: string;
    company: string;
    category: string;
}

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

    static async getJobs({ filters = null } = {}) {
        let query: Object;
        console.log(filters)
        if (filters) {
            if ("name" in filters) {
                query = { $text: { $search: filters["name"] } }
            } else if ("category" in filters) {
                query = { $text: { $search: filters["category"] } }
            }
        }
        let cursor;
        try {
            cursor = await jobs.find(query);
        } catch (e) {
            console.error(`Unable to issue the find command ${e}`)
            return { jobsList: [], totalNumJobs: 0 };
        }

        try {
            const jobsList = await cursor.toArray();
            const totalNumJobs = jobsList.length;
            return { jobsList, totalNumJobs };
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting document ${e}`);
            return { jobsList: [], totalNumJobs: 0 };
        }
    }

    static async addJob(newObject: AddJob): Promise<void | Object> {
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

    static async editJob(jobId: ObjectId, jobInfo: EditJob): Promise<Object> {
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
}