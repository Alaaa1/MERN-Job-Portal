import { Request, Response } from "express";
import getJobsUsecase from "./GetJobs.usecase";

export default class GetJobsEndpoint {
    private useCase: getJobsUsecase;
    constructor(getJobsUsecase: getJobsUsecase) {
        this.useCase = getJobsUsecase;
    }
    async execute(req: Request, res: Response) {
        try {
            const jobs = await this.useCase.execute();
            return res.status(200).json({ jobs });
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: e.message });
        }
    }
}