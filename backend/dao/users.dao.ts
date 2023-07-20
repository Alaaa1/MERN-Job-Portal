import { ObjectId } from "mongodb";
import createSecretToken from "../utils/SecretToken";
import bcrypt from "bcrypt";

export let users;

export default class UsersDAO {
    static async injectDB(conn) {
        if (users) {
            return
        }
        try {
            users = await conn.db(process.env.DB_NAME).collection("users");
        } catch (e) {
            console.error(`Unable to establish connection to users collection ${e}`);
        }
    }

    static async signupUser(username: string, email: string, password: string, role: string) {
        try {
            const existingUser = await users.findOne({ email });
            const _id = new ObjectId();
            const hashedPassword = await bcrypt.hash(password, 12);;
            const user = {
                _id, username, email, hashedPassword, role
            }
            if (existingUser) {
                return false;
            }
            await users.insertOne(user);
            console.log("id", user._id);
            const token = createSecretToken(user._id);
            return { token: token, user: user };
        } catch (e) {
            console.error(`Unable to signup user ${e}`);
            return { error: e };
        }
    }

    static async loginUser(email: string, password: string) {
        try {
            const user = await users.findOne({ email });
            console.log("login user", user);
            if (!user) {
                return false;
            }
            const auth = await bcrypt.compare(password, user.hashedPassword)
            if (!auth) {
                return false;
            }
            const token = createSecretToken(user._id);
            return { token: token, user: user };
        } catch (e) {
            console.error(`Unable to login user ${e}`);
            return { error: e };
        }
    }

    static async findUserById(id: string) {
        try {
            const user = await users.findOne({ _id: new ObjectId(id) });
            console.log("doa finduserbyid", user);
            return user;
        } catch (e) {
            console.error(`Unable to login user ${e}`);
            return { error: e };
        }
    }
}