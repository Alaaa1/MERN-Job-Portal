import { Request, Response } from "express";
import UserService from "../../services/userService";
import { INewUserFormInfo } from "../../types";

const UserServiceInstance = new UserService();

//todo create user service, job service and move business logic to them
//todo controllers are very light
//todo DOA is usually created for custom queries

export default class UsersController {
    static async apiSignupUser(req: Request, res: Response): Promise<void> {
        try {
            const { username, email, password, role } = req.body;
            const newUser: INewUserFormInfo = { username, password, email, role };
            const result = await UserServiceInstance.signupUser(newUser);
            res.cookie("token", result.token, {
                httpOnly: false,
            });
            res.status(201).json({ user: result.user });
        } catch (e) {
            res.status(500).json({ error: e.message });
            console.error(e);
        }
    }

    static async apiLoginUser(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const result = await UserServiceInstance.loginUser(email, password);
            res.cookie("token", result.token, {
                httpOnly: false,
            });
            res.status(200).json({ user: result.user });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}