import { Request, Response, NextFunction } from "express";
import JobsDAO from "../../dao/jobs.dao";
import { AddJob, DAOEditResponse, ApiGetResponse, DAOPostResponse, EditJob, ErrorMessage, Filters, DAOGetResult } from "../../types";
import { ObjectId } from "mongodb";




export default class JobsController {
    static async apiGetJobs(req: Request, res: Response, next: NextFunction): Promise<void> {
        let filters: Filters = {};
        if (req.query.name) {
            filters.name = req.query.name as string; //todo use RequestHandler instead of cast as string
        }
        const { jobs, total_results }: DAOGetResult = await JobsDAO.getJobs({ filters });
        const response: ApiGetResponse = {
            jobs,
            total_results
        };
        res.json(response);
    }

    static async apiPostJob(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const newJob: AddJob = {
                name: req.body.name,
                datePosted: new Date(),
                company: req.body.company,
                category: req.body.category
            }
            const response: DAOPostResponse | ErrorMessage = await JobsDAO.addJob(newJob);
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiEditJob(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const jobId: ObjectId = req.body._id;
            const data: EditJob = {
                name: req.body.name,
                company: req.body.company,
                category: req.body.category
            }
            const response: DAOEditResponse | ErrorMessage = await JobsDAO.editJob(jobId, data);
            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}