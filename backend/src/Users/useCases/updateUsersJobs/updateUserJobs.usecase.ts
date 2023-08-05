import { UsersRepository } from "../../lib/db/repos/usersRepository";

export class UpdateUserJobs {
    userRepository: UsersRepository;

    constructor(userRepo: UsersRepository) {
        this.userRepository = userRepo;
    }

    async execute(userId: string, newJobs: object[]) {
        try {
            const result = await this.userRepository.updateUserJobs(userId, newJobs);
            return result;
        } catch (e) {
            console.error(e);
            return e;
        }
    }
}