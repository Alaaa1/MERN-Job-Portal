import JobsRepository from "../../db/repositories/JobsRepository";

export default class GetJobsUsecase {
    jobsRepository: JobsRepository;
    constructor(jobsRepository: JobsRepository) {
        this.jobsRepository = jobsRepository;
    };

    async execute(): Promise<object[]> {
        return await this.jobsRepository.getJobs();
    }
}