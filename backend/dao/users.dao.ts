import { ObjectId } from "mongodb";
import createSecretToken from "../utils/SecretToken";
import bcrypt from "bcrypt";
import User from "../models/User";
import { ErrorMessage, IUser, IUsersDAOResponse } from "../types";
export default class UsersDAO {
    static async signupUser(username: string, email: string, password: string, role: string): Promise<IUsersDAOResponse | ErrorMessage> {
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return { dbResponse: false };
            }

            const _id = new ObjectId();
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = {
                _id, username, email, hashedPassword, role
            }
            const newUser: IUser = await User.create(user);
            const token = createSecretToken(user._id);
            const daoResponse: IUsersDAOResponse = { user: newUser, dbResponse: true, token };
            return daoResponse;
        } catch (e) {
            console.error(`Unable to signup user ${e}`);
            return { error: e };
        }
    }

    static async loginUser(email: string, password: string): Promise<IUsersDAOResponse | ErrorMessage> {
        try {
            const user = await User.findOne({ email }).exec();
            if (!user) {
                return { dbResponse: false };
            }
            const auth = await bcrypt.compare(password, user.hashedPassword)
            if (!auth) {
                return { dbResponse: false };
            }
            const token = createSecretToken(user._id);
            const daoResponse: IUsersDAOResponse = { token, user, dbResponse: true };
            return daoResponse;
        } catch (e) {
            console.error(`Unable to login user ${e}`);
            return { error: e };
        }
    }
}