import { UsersRepository } from "../../lib/db/repos/usersRepository";
import { UserMappers } from "../../lib/mappers/UserMappers";
import { GetUserByIdEndpoint } from "./getUserById.endpoint";
import { GetUserByIdUsecase } from "./getUserById.usecase";

const userMappers = new UserMappers();

const usersRepository = new UsersRepository(userMappers);

const getUserByIdUsecase = new GetUserByIdUsecase(usersRepository);

const getUserByIdEndpoint = new GetUserByIdEndpoint(getUserByIdUsecase);

export default getUserByIdEndpoint;
