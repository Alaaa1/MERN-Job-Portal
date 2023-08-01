import { Request, Response } from "express";
import { CreateJob } from "./createJob.usecase";

export default class CreateJobEndpoint {
    private useCase: CreateJob;

    constructor(createJobUsecase: CreateJob) {
        this.useCase = createJobUsecase;
    }
    async execute(req: Request, res: Response) {
        let body = req.body;
        const { name, company, category, user_id } = body;
        if (!name || !company || !category || !user_id) {
            return res.status(400).json({ message: `Required info is missing` });
        }
        try {
            const jobs = await this.useCase.execute({ name, company, category, user_id });
            return res.status(200).json({ jobs });
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: e.message });
        }
    }
}