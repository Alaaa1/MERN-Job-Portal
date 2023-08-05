import JobsRepository from "../../lib/db/repositories/JobsRepository";

export default class GetJobsUsecase {

    jobsRepository: JobsRepository;

    constructor(repo: JobsRepository) {
        this.jobsRepository = repo;
    };

    async execute(): Promise<object[]> {
        return await this.jobsRepository.getJobs();
    }
}