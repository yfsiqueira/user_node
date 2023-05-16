import { prismaClient } from "../../../../../../infra/db/prisma.config";
import { UserEntity } from "../../../../entities/user.entity";
import { IUserRepository } from "../user.repository.interface";

export class UserPrismaRepository implements IUserRepository {
    async save({ name, surname, phone, cep, address, origin }: UserEntity): Promise<any> {
        const user = await prismaClient.user.create({
            data: {
                name, surname, phone, cep, address, origin
            }
        });
        return user;


    }
}