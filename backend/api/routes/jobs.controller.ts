import { Request, Response, NextFunction } from "express";
import JobsDAO from "../../dao/jobs.dao";
import { IJobsDAOResponse, INewJobInfo, ErrorMessage, Filters, INewJob } from "../../types";
import { ObjectId } from "mongodb";

export default class JobsController {
    static async apiGetJobs(req: Request, res: Response): Promise<void> {
        let filters: Filters = {};
        if (req.query.name) {
            filters.name = req.query.name as string; //todo use RequestHandler instead of cast as string
        }
        const daoResponse: IJobsDAOResponse | ErrorMessage = await JobsDAO.getJobs({ filters });
        if ("dbResponse" in daoResponse && daoResponse.dbResponse) {
            res.json({ status: true, response: daoResponse });
        } else {
            res.json({ status: false, response: daoResponse });
        }
    }

    static async apiPostJob(req: Request, res: Response): Promise<void> {
        try {
            const newJob: INewJob = {
                name: req.body.name,
                datePosted: new Date(),
                company: req.body.company,
                category: req.body.category,
                user_id: new ObjectId(req.body.user_id)
            }
            const daoResponse: IJobsDAOResponse | ErrorMessage = await JobsDAO.addJob(newJob);
            if ("dbResponse" in daoResponse && daoResponse.dbResponse) {
                res.json({ status: true, response: daoResponse });
            } else {
                res.json({ status: false, response: daoResponse });
            }
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiEditJob(req: Request, res: Response): Promise<void> {
        try {
            const jobId: ObjectId = req.body._id;
            const user_id: string = req.body.user_id;
            const newJobInfo: INewJobInfo = {
                name: req.body.name,
                company: req.body.company,
                category: req.body.category
            }
            const daoResponse: IJobsDAOResponse | ErrorMessage = await JobsDAO.editJob(jobId, newJobInfo, user_id);
            if ("dbResponse" in daoResponse && daoResponse.dbResponse) {
                res.json({ status: true, response: daoResponse });
            }
            else {
                res.json({ status: false, response: daoResponse });
            }
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteJob(req: Request, res: Response): Promise<void> {
        try {
            const jobId: ObjectId = req.body._id;
            const user_id: string = req.body.user_id;
            const daoResponse: IJobsDAOResponse | ErrorMessage = await JobsDAO.deleteJob(jobId, user_id);
            if ("dbResponse" in daoResponse && daoResponse.dbResponse) {
                res.json({ status: true, response: daoResponse });
            } else {
                res.json({ status: false, response: daoResponse });
            }
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}