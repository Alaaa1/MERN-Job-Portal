import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { User } from "../db/mongo/User";

const UserServiceInstance = new User();

dotenv.config();

export default class UserAuthentication {
    static userVerification(req: Request, res: Response) {
        const token = req.cookies.token;
        if (!token) {
            console.log("no token");
            return res.json({ status: false });
        }
        jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
            if (err) {
                console.log("error");
                return res.json({ status: false });
            } else {
                const user = await UserServiceInstance.findUserById(data.id);
                console.log(user);
                if (user) {
                    res.json({ status: true, user })
                }
                else {
                    return res.json({ status: false });
                }
            }
        })
    }
}

