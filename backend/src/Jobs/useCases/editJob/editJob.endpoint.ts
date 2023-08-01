import { EditJobUseCase } from "./editJob.usecase";

export class EditJobEndpoint {

    useCase: EditJobUseCase;

    constructor(useCase: EditJobUseCase) {
        this.useCase = useCase;
    }

    async execute(req, res) {
        const body = req.body;
        const { jobId, userId, company, category, name } = body;
        console.log(body);
        if (!jobId || !userId || !company || !name || !category) {
            return res.status(400).json({ message: "missing required information" });
        }
        try {
            const result = await this.useCase.execute(jobId, { company, name, category }, userId);
            return res.status(200).json({ result });
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}