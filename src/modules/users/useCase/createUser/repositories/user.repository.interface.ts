import { UserEntity } from "../../../entities/user.entity";

export interface IUserRepository {
    save(payload: UserEntity): Promise<UserEntity>
}