import { UpdateUserJobs } from './../../../Users/useCases/updateUsersJobs/updateUserJobs.usecase';
import { GetUserById } from "../../../Users/useCases/getUserById/getUserById.usecase";
import JobsRepository from "../../lib/db/repositories/JobsRepository";

export class DeleteJob {

    jobsRepository: JobsRepository;
    getUserByIdUseCase: GetUserById;
    updateUserJobsUsecase: UpdateUserJobs;

    constructor(jobsRepo: JobsRepository, getUserByIdUsecase: GetUserById, updateUserJobsUsecase: UpdateUserJobs) {
        this.jobsRepository = jobsRepo;
        this.getUserByIdUseCase = getUserByIdUsecase;
        this.updateUserJobsUsecase = updateUserJobsUsecase;
    }

    async execute(jobId: string, userId: string) {
        try {
            const job = await this.jobsRepository.getJobById(jobId);
            if (userId === job.user_id.toString()) {
                const deletedJob = await this.jobsRepository.deleteJob(jobId);
                let user = await this.getUserByIdUseCase.execute(userId);
                const index = user.jobs.indexOf(jobId);
                if (index > -1) {
                    user.jobs.splice(index, 1);
                    await this.updateUserJobsUsecase.execute(userId, user.jobs);
                }
                return deletedJob;
            }
            return false;
        } catch (e) {
            console.error(`Delete Job use case: can't delete job ${e}`);
            return e;
        }
    }
}