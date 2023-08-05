import { IToDomainProps } from "../../userTypes";
import { UserEntity } from "../entities/UserEnitity";



export class UserMappers {

    toDomain(raw: IToDomainProps) {
        const { id, username, email, hashedPassword, jobs, role } = raw;
        return new UserEntity(id, username, jobs, hashedPassword, email, role);
    }
}