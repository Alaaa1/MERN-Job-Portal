import { UserMappers } from './../../lib/mappers/UserMappers';
import { UsersRepository } from "../../lib/db/repos/usersRepository";
import { UpdateUserJobs } from './updateUserJobs.usecase';
import { GetUserByIdUsecase } from '../getUserById/getUserById.usecase';

const userMappers = new UserMappers();

const usersRepository = new UsersRepository(userMappers);

const getUserByIdUsecase = new GetUserByIdUsecase(usersRepository);

const updateUserJobsUsecase = new UpdateUserJobs(usersRepository, getUserByIdUsecase);

export default updateUserJobsUsecase;