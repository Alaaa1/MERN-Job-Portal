import JobsRepository from "../../db/repositories/JobsRepository";
import GetJobsEndpoint from "./GetJobs.endpoint";
import GetJobsUsecase from "./GetJobs.usecase";


const jobsRepository = new JobsRepository();

const getJobsUseCase = new GetJobsUsecase(jobsRepository);

const getjobsEndpoint = new GetJobsEndpoint(getJobsUseCase);

export default getjobsEndpoint;