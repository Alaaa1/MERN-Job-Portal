import { UsersRepository } from "../../../Users/lib/db/repos/usersRepository";
import { UpdateUserJobs } from "../../../Users/useCases/updateUsersJobs/updateUserJobs.usecase";
import JobsRepository from "../../lib/db/repositories/JobsRepository";
import { JobEntity } from "../../lib/entities/jobEntity";
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
        const job = JobEntity.create(newJob);
        try {
            const createdJob = await this.jobsRepository.createJob(job);
            let user = await this.usersRepository.findUserById(job.user_id.toString());
            if (user && user.jobs) {
                let user_jobs: string[] = user.jobs;
                user_jobs.push(createdJob._id);
                await this.updateUserJobs.execute(job.user_id.toString(), user_jobs);
                return createdJob;
            }
            return { message: "user not found" };
        } catch (e) {
            console.error(`Job Service: Unable to create a job ${e}`);
            return e;
        }
    }
}