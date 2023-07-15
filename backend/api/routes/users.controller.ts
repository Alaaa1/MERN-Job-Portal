import UsersDAO from "../../dao/users.dao";

export default class UsersController {
    static async apiGetUser(req, res, next): Promise<void> {
        try {
            const result = await UsersDAO.findUser(req.body._id);
            console.log("apiGetUser", result);
            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}