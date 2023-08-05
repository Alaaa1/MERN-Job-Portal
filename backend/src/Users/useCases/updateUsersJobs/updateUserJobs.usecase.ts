import { UsersRepository } from "../../lib/db/repos/usersRepository";
import { GetUserByIdUsecase } from "../getUserById/getUserById.usecase";

export class UpdateUserJobs {
    userRepository: UsersRepository;
    getUserByIdUsecase: GetUserByIdUsecase;

    constructor(userRepo: UsersRepository, getUserByIdUsecase: GetUserByIdUsecase) {
        this.userRepository = userRepo;
        this.getUserByIdUsecase = getUserByIdUsecase;
    }

    async execute(userId: string, newJob: string) {
        const user = await this.getUserByIdUsecase.execute(userId);
        user.addJob(newJob);
        try {
            const result = await this.userRepository.updateUserJobs(userId, user.jobs);
            return result;
        } catch (e) {
            console.error(e);
            return e;
        }
    }
}