import { UserEntity } from "../../../entities/user.entity";
import { CreateUserUseCaseDto } from "../dto/create-user.dto";

export interface IUserRepository {
    save(payload: UserEntity): Promise<any>
}