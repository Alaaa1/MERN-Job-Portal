import { UsersRepository } from "../../../Users/lib/db/repos/usersRepository";
import { UpdateUserJobs } from "../../../Users/useCases/updateUsersJobs/updateUserJobs.usecase";
import JobsRepository from "../../lib/db/repositories/JobsRepository";
import { CreateJob } from "./createJob.usecase";
import CreateJobEndpoint from "./createJob.endpoint";
import { UserMappers } from "../../../Users/lib/mappers/UserMappers";

const jobsRepository = new JobsRepository();
const userMappers = new UserMappers();
const usersRepository = new UsersRepository(userMappers);

const updateUserJobs = new UpdateUserJobs(usersRepository);

const createJobUsecase = new CreateJob(jobsRepository, usersRepository, updateUserJobs);

const createjobEndpoint = new CreateJobEndpoint(createJobUsecase);

export default createjobEndpoint;