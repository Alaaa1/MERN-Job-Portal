import { ObjectId } from "mongodb";
import { User } from "../db/mongo/User";
import { INewUserFormInfo } from "../types";
import bcrypt from "bcrypt";
import createSecretToken from "../utils/SecretToken";

const UserInstance = new User();

export default class UserService {

    async findUserById(user_id: ObjectId) {
        try {
            const result = await UserInstance.findUserById(user_id);
            return result;
        } catch (e) {
            return e;
        }
    }

    async updateUserJobs(user_id: ObjectId, newJobs: []) {
        try {
            const result = await UserInstance.updateUserJobs(user_id, newJobs);
            return result;
        } catch (e) {
            return e;
        }
    }

    async signupUser(newUser: INewUserFormInfo) {
        try {
            let token;
            const existingUser = await UserInstance.findUserByEmail(newUser.email);
            if (!existingUser) {
                const _id = new ObjectId();
                const hashedPassword = await bcrypt.hash(newUser.password, 12);
                const userObject = {
                    _id, username: newUser.username, email: newUser.email, hashedPassword, role: newUser.role
                };
                const user = await UserInstance.createUser(userObject);
                createSecretToken(_id);
                return { user, token };
            }
        } catch (e) {
            return e;
        }
    }

    async loginUser(email: string, password: string) {
        try {
            let token;
            const user = await UserInstance.findUserByEmail(email);
            if (user) {
                const auth = await bcrypt.compare(password, user.hashedPassword);
                if (auth) {
                    token = createSecretToken(user._id);
                    return { user, token };
                }
            }
        } catch (e) {
            return e;
        }
    }
} 