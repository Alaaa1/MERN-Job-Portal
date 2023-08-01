import { UsersRepository } from "../../db/repos/usersRepository";

export class GetUserById {
    userRepository: UsersRepository;

    constructor(usersRepo: UsersRepository) {
        this.userRepository = usersRepo;
    }

    async execute(userId: string) {
        try {
            const user = await this.userRepository.findUserById(userId);
            return user;
        } catch (e) {
            console.error(`getUserByIdUsecase: unable to get user by id ${e}`);
            return e;
        }
    }
}