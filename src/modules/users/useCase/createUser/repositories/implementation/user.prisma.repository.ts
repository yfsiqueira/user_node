import { CustomError } from "../../../../../../errors/custom.error";
import { prismaClient } from "../../../../../../infra/db/prisma.config";
import { UserEntity } from "../../../../entities/user.entity";
import { IUserRepository } from "../user.repository.interface";

export class UserPrismaRepository implements IUserRepository {
    async save({ name, surname, phone, cep, address, origin }: UserEntity): Promise<UserEntity> {

        try {
            const user = await prismaClient.user.create({
                data: {
                    name, surname, phone, cep, address, origin
                }
            });

            return user;
        } catch (error: any) {
            throw new CustomError('Database Service is Unavailable', 503);
        }
    }
}