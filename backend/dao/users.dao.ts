import { ObjectId } from "mongodb";

let users;

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

    static async findUser(_id: ObjectId): Promise<void | Object> {
        try {
            const user = await users.findOne(new ObjectId(_id));
            console.log("findUser", user);
            if (user) {
                return user;
            }
            return false;
        } catch (e) {
            console.error(`Unable to find user ${e}`);
            return { error: e };
        }
    }
}