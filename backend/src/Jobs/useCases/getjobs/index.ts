import JobsRepository from "../../lib/db/repositories/JobsRepository";
import GetJobsEndpoint from "./getJobs.endpoint";
import GetJobsUsecase from "./getJobs.usecase";


const jobsRepository = new JobsRepository();

const getJobsUseCase = new GetJobsUsecase(jobsRepository);

const getjobsEndpoint = new GetJobsEndpoint(getJobsUseCase);

export default getjobsEndpoint;