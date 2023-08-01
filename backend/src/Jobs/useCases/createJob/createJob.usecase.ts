import { UserRepository } from "../../../Users/db/repos/usersRepository";
import { UpdateUserJobs } from "../../../Users/useCases/updateUserJobs.usecase";
import JobsRepository from "../../db/repositories/JobsRepository";
import { INewJob } from "../../jobsTypes";

export class CreateJob {
    jobsRepository: JobsRepository;
    usersRepository: UserRepository;
    updateUserJobs: UpdateUserJobs;


    constructor(jobsRepo: JobsRepository, usersRepo: UserRepository, updateUserJobs: UpdateUserJobs) {
        this.jobsRepository = jobsRepo;
        this.usersRepository = usersRepo;
        this.updateUserJobs = updateUserJobs;
    };

    async execute(newJob: INewJob) {
        try {
            const createdJob = await this.jobsRepository.createJob(newJob);
            let user = await this.usersRepository.findUserById((newJob.user_id).toString());
            let user_jobs: object[] = user.jobs;
            user_jobs.push(createdJob._id);
            await this.updateUserJobs.execute(newJob.user_id.toString(), user_jobs);
            return createdJob;
        } catch (e) {
            console.error(`Job Service: Unable to create a job ${e}`);
            return e;
        }
    }
}