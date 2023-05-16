import { UserEntity } from "../../../../entities/user.entity";
import { CreateUserUseCaseDto } from "../../dto/create-user.dto";
import { IUserRepository } from "../user.repository.interface";
import { PrismaClient } from '@prisma/client'

export class UserPrismaRepository implements IUserRepository {
    async save({ name, surname, phone, cep, address, origin }: UserEntity): Promise<any> {
        const prismaClient = new PrismaClient();
        const user = await prismaClient.user.create({
            data: {
                name, surname, phone, cep, address, origin
            }
        });
        return user;


    }
}