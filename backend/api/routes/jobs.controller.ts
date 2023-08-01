import { Request, Response } from "express";
import { IEditedJobInfo, Filters, INewJob } from "../../src/shared/types";
import { ObjectId } from "mongodb";
import JobService from "../../services/jobService";
const JobServiceInstance = new JobService();

export default class JobsController {
    static async apiGetJobs(req: Request, res: Response): Promise<void> {
        try {
            let filters: Filters = {};
            if (req.query.name) {
                filters.name = req.query.name as string;//move logic to service?
            }
            const jobs = await JobServiceInstance.getJobs({ filters });
            res.status(200).json({ jobs });
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: e.message });
        }
    }

    static async apiPostJob(req: Request, res: Response): Promise<void> {
        try {
            const newJob: INewJob = {
                name: req.body.name,
                datePosted: new Date(),
                company: req.body.company,
                category: req.body.category,
                user_id: new ObjectId(req.body.user_id)//todo: move creating the objectId to the DAL
            } //todo use transaction in order to add job to user only after successfully creating job
            const createdJob = await JobServiceInstance.createJob(newJob);
            res.status(201).json({ createdJob });
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiEditJob(req: Request, res: Response): Promise<void> {
        try {
            const jobId: ObjectId = req.body._id;
            const user_id: ObjectId = req.body.user_id;
            const newJobInfo: IEditedJobInfo = {
                name: req.body.name,
                company: req.body.company,
                category: req.body.category
            }
            const editedJob = await JobServiceInstance.editJob(jobId, newJobInfo, user_id);
            res.status(200).json({ editedJob });
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteJob(req: Request, res: Response): Promise<void> {
        try {
            const jobId: ObjectId = req.body._id;//todo: move databse related objectID to DAL
            const user_id: ObjectId = req.body.user_id;
            const deletedJob = await JobServiceInstance.deleteJob(jobId, user_id);
            res.status(200).json({ deletedJob });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}