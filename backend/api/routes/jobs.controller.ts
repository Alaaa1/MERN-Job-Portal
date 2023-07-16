import { Request, Response, NextFunction, RequestHandler } from "express";
import JobsDAO from "../../dao/jobs.dao";
import { AddJob } from "../../types";

interface Filters {
    name?: string;
    category?: string;
}

interface Result {
    jobsList: Array<object>;
    totalNumJobs: number;
}

interface APIResponse {
    jobs: Array<object>;
    total_results: number;
}
export default class JobsController {
    static async apiGetJobs(req: Request, res: Response, next: NextFunction): Promise<void> {
        let filters: Filters = {};
        console.log("Got called");
        if (req.query.name) {
            filters.name = req.query.name as string; //todo use RequestHandler instead of cast as string
        }
        const { jobsList, totalNumJobs }: Result = await JobsDAO.getJobs({ filters });
        let response: APIResponse = {
            jobs: jobsList,
            total_results: totalNumJobs
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
            const jobResponse = await JobsDAO.addJob(newJob);
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiEditJob(req, res, next) {
        try {
            console.log(req.body);
            const jobId = req.body._id;
            const data = {
                name: req.body.name,
                company: req.body.company,
                category: req.body.category
            }
            const reposne = await JobsDAO.editJob(jobId, data);
            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}