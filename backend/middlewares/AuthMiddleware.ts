import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User";
import { Request, Response } from "express";

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
                console.log("middleware data", data);
                const user = await User.findById(data.id);
                console.log(user);
                if (user) {
                    res.json({ status: true, user: user.username })
                }
                else return res.json({ status: false })
            }
        })
    }
}

