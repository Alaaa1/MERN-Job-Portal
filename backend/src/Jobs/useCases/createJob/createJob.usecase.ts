import { UsersRepository } from "../../../Users/db/repos/usersRepository";
import { UpdateUserJobs } from "../../../Users/useCases/updateUsersJobs/updateUserJobs.usecase";
import JobsRepository from "../../db/repositories/JobsRepository";
import { INewJob } from "../../jobsTypes";

export class CreateJob {
    jobsRepository: JobsRepository;
    usersRepository: UsersRepository;
    updateUserJobs: UpdateUserJobs;


    constructor(jobsRepo: JobsRepository, usersRepo: UsersRepository, updateUserJobs: UpdateUserJobs) {
        this.jobsRepository = jobsRepo;
        this.usersRepository = usersRepo;
        this.updateUserJobs = updateUserJobs;
    };

    async execute(newJob: INewJob) {
        try {
            const createdJob = await this.jobsRepository.createJob(newJob);
            let user = await this.usersRepository.findUserById((newJob.user_id).toString());
            if (user && user.jobs) {
                let user_jobs: object[] | undefined = user.jobs;
                user_jobs.push(createdJob._id);
                await this.updateUserJobs.execute(newJob.user_id.toString(), user_jobs);
                return createdJob;
            }
        } catch (e) {
            console.error(`Job Service: Unable to create a job ${e}`);
            return e;
        }
    }
}