import { DeleteJob } from "./deleteJob.usecase";

export class DeleteJobEndpoint {
    useCase: DeleteJob;

    constructor(useCase: DeleteJob) {
        this.useCase = useCase;
    }

    async execute(req, res) {
        const body = req.body;
        const { jobId, userId } = body;
        if (!jobId || !userId) {
            return res.status(400).json({ message: `Required info is missing` });
        }
        try {
            const result = await this.useCase.execute(jobId, userId);
            return res.status(200).json({ result });
        } catch (e) {
            console.error(`deleteJob.endpoint.ts: Unable to delete job ${e}`);
            res.status(500).json({ message: e.message });
        }
    }
}