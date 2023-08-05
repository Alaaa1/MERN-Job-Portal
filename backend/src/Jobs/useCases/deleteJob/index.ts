import { UsersRepository } from "../../../Users/lib/db/repos/usersRepository";
import { UserMappers } from "../../../Users/lib/mappers/UserMappers";
import { GetUserByIdUsecase } from "../../../Users/useCases/getUserById/getUserById.usecase";
import { UpdateUserJobs } from "../../../Users/useCases/updateUsersJobs/updateUserJobs.usecase";
import JobsRepository from "../../lib/db/repositories/JobsRepository";
import { DeleteJobEndpoint } from "./deleteJob.endpoint";
import { DeleteJob } from "./deleteJob.usecase";

const jobsRepository = new JobsRepository();
const userMappers = new UserMappers();
const usersRepository = new UsersRepository(userMappers);

const getUserByIdUsecase = new GetUserByIdUsecase(usersRepository);

const updateUserJobs = new UpdateUserJobs(usersRepository);

const deleteJobUseCase = new DeleteJob(jobsRepository, getUserByIdUsecase, updateUserJobs);

const deleteJobEndpoint = new DeleteJobEndpoint(deleteJobUseCase);

export default deleteJobEndpoint;