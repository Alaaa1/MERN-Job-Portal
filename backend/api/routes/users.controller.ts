import { Request, Response } from "express";
import UsersDAO from "../../dao/users.dao";

//todo create user service, job service and move business logic to them
//todo controllers are very light
//todo DOA is usually created for custom queries

export default class UsersController {
    static async apiSignupUser(req: Request, res: Response): Promise<void> {
        try {
            const { username, password, email, role } = req.body
            const daoResponse = await UsersDAO.signupUser(username, email, password, role);
            if ("dbResponse" in daoResponse && daoResponse.dbResponse) {
                res.cookie("token", daoResponse.token, {
                    httpOnly: false,
                });
                res.json({ status: true, response: daoResponse });
            } else {
                res.json({ status: false, response: daoResponse });//todo use DTO
            }
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiLoginUser(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.json({ status: false, message: "Email and password are required" });
            } else {
                const daoResponse = await UsersDAO.loginUser(email, password);
                if (!daoResponse) {
                    res.json({ status: false, message: "Invalid email or password" });
                } else {
                    if ("dbResponse" in daoResponse && daoResponse.dbResponse) {
                        res.cookie("token", daoResponse.token, {
                            httpOnly: false,
                        });
                        res.json({ status: true, response: daoResponse });
                    }
                    else {
                        res.json({ status: false, response: daoResponse });
                    }
                }
            }
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}