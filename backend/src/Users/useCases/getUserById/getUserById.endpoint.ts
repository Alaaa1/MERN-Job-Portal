import { Request, Response } from "express";
import { GetUserByIdUsecase } from "./getUserById.usecase";

export class GetUserByIdEndpoint {
    readonly usecase: GetUserByIdUsecase;

    constructor(usecase: GetUserByIdUsecase) {
        this.usecase = usecase;
    }

    async execute(req: Request, res: Response) {
        let body = req.body;
        const { id } = body.id;
        if (!id) {
            res.status(400).json({ message: "missing user id" });
        }
        try {
            const response = await this.usecase.execute(id);
            res.status(200).json({ response });
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: e.message });
        }
    }
}