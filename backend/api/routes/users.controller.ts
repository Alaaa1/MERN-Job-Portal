import UsersDAO from "../../dao/users.dao";

export default class UsersController {
    static async apiSignupUser(req, res, next): Promise<void> {
        try {
            const { username, password, email, role } = req.body
            const result = await UsersDAO.signupUser(username, email, password, role);
            if (!result) {
                return res.json({ message: "User already exists" });
            }
            res.cookie("token", result.token, {
                withCredentials: true,
                httpOnly: false,
            });
            res.status(201).json({ message: "user signed up successfully", success: true });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiLoginUser(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.json({ message: "Email and password are required" });
            }
            const result = await UsersDAO.loginUser(email, password);
            if (!result) {
                return res.json({ message: "Invalid email or password" });
            }
            console.log("token and user", result);
            res.cookie("token", result.token, {
                withCredentials: true,
                httpOnly: false,
            });
            res.status(201).json({ message: "User logged in successfully", success: true, user: result.user });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}