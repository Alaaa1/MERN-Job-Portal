import { EditJobUseCase } from './editJob.usecase';
import JobsRepository from "../../db/repositories/JobsRepository";
import { EditJobEndpoint } from './editJob.endpoint';


const jobsRepository = new JobsRepository();

const editjobsUsecase = new EditJobUseCase(jobsRepository);

const editJobsEndpoint = new EditJobEndpoint(editjobsUsecase);

export default editJobsEndpoint;