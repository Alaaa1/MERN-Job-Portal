import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UsersDAO from "../dao/users.dao";

dotenv.config();

export default class UserAuthentication {
    static userVerification(req, res, next) {
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
                const user = await UsersDAO.findUserById(data.id);
                console.log(user);
                if (user) {
                    res.json({ status: true, user: user.username })
                }
                else return res.json({ status: false })
            }
        })
    }
}

