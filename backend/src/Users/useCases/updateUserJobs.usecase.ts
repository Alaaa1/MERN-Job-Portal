import { UserRepository } from "../db/repos/usersRepository";

export class UpdateUserJobs {
    userRepository: UserRepository;

    constructor(userRepo: UserRepository) {
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