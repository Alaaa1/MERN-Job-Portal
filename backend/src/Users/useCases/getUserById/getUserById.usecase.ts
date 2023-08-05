import { UsersRepository } from "../../lib/db/repos/usersRepository";
import { UserEntity } from "../../lib/entities/UserEnitity";

export class GetUserById {
    userRepository: UsersRepository;

    constructor(usersRepo: UsersRepository) {
        this.userRepository = usersRepo;
    }

    async execute(userId: string): Promise<UserEntity | null> {
        if (!userId) {
            throw new Error("User id is missing");
        }

        try {
            const user = await this.userRepository.findUserById(userId);
            return user;
        } catch (e) {
            console.error(`getUserByIdUsecase: unable to get user by id ${e}`);
            return e;
        }
    }
}