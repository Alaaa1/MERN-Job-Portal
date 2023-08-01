import { UsersRepository } from "../../../Users/db/repos/usersRepository";
import { UpdateUserJobs } from "../../../Users/useCases/updateUsersJobs/updateUserJobs.usecase";
import JobsRepository from "../../db/repositories/JobsRepository";
import { CreateJob } from "./createJob.usecase";
import CreateJobEndpoint from "./createJob.endpoint";

const jobsRepository = new JobsRepository();
const usersRepository = new UsersRepository();

const updateUserJobs = new UpdateUserJobs(usersRepository);

const createJobUsecase = new CreateJob(jobsRepository, usersRepository, updateUserJobs);

const createjobEndpoint = new CreateJobEndpoint(createJobUsecase);

export default createjobEndpoint;