import { UsersRepository } from "../../../Users/db/repos/usersRepository";
import { GetUserById } from "../../../Users/useCases/getUserById/getUserById.usecase";
import { UpdateUserJobs } from "../../../Users/useCases/updateUsersJobs/updateUserJobs.usecase";
import JobsRepository from "../../lib/db/repositories/JobsRepository";
import { DeleteJobEndpoint } from "./deleteJob.endpoint";
import { DeleteJob } from "./deleteJob.usecase";

const jobsRepository = new JobsRepository();
const usersRepository = new UsersRepository();

const getUserByIdUsecase = new GetUserById(usersRepository);

const updateUserJobs = new UpdateUserJobs(usersRepository);

const deleteJobUseCase = new DeleteJob(jobsRepository, getUserByIdUsecase, updateUserJobs);

const deleteJobEndpoint = new DeleteJobEndpoint(deleteJobUseCase);

export default deleteJobEndpoint;