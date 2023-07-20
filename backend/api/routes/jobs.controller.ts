import { Request, Response, NextFunction } from "express";
import JobsDAO from "../../dao/jobs.dao";
import { IDAOEditJob, ApiGetResponse, INewJobInfo, ErrorMessage, Filters, DAOGetResult, INewJob, IDAOAddJob } from "../../types";
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

    static async apiPostJob(req: Request, res: Response): Promise<void> {
        try {
            const newJob: INewJob = {
                name: req.body.name,
                datePosted: new Date(),
                company: req.body.company,
                category: req.body.category,
                user_id: "11"
            }
            const daoResponse: IDAOAddJob | ErrorMessage = await JobsDAO.addJob(newJob);
            if ("dbResponse" in daoResponse && daoResponse.dbResponse) {
                res.json({ status: "success", response: daoResponse });
            }
            res.json({ status: "Failed", response: daoResponse });
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
            const daoResponse: IDAOEditJob | ErrorMessage = await JobsDAO.editJob(jobId, newJobInfo, user_id);
            if ("dbResponse" in daoResponse && daoResponse.dbResponse) {
                return res.json({ status: "success", response: daoResponse });
            }
            res.json({ status: "Failed", response: daoResponse });
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteJob(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id: string = req.body._id;
            await JobsDAO.deleteJob(id);
            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}