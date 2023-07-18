import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UsersDAO from "../dao/users.dao";

dotenv.config();

export function userLogout(req, res) {
    res.clearCookie("token");
    res.end();
}

export function userVerification(req, res) {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ status: false });
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            return res.json({ status: false });
        } else {
            console.log("middleware data", data);
            const user = await UsersDAO.findUserById(data.id);
            console.log(user);
            if (user) return res.json({ status: true, user: user.username })
            else return res.json({ status: false })
        }
    })
}