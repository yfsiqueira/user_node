import { prismaClient } from "../../../../../../infra/db/prisma.config";
import { UserPrismaRepository } from "../implementation/user.prisma.repository";
import { randomUUID } from "crypto";

describe('User Prisma Repository Tests', () => {
    test('Should be create a user', async () => {

        const userId = randomUUID();

        const userMock = {
            id: userId,
            name: "Teste da Silva",
            surname: "tsilva",
            phone: "(11)984512236",
            address: "Teste de Logradouro",
            cep: "06823120",
            origin: "user_node"
        }

        const mockPrismaClient = prismaClient.user.create = jest.fn().mockResolvedValue(userMock);

        const userPrismaRepository = new UserPrismaRepository();
        const userSaved = await userPrismaRepository.save(userMock);

        expect(mockPrismaClient).toHaveBeenCalledTimes(1);
        expect(userSaved.id).toEqual(userId);
    })

    test('Should not be create a user', async () => {

        const userId = randomUUID();

        const userMock = {
            id: userId,
            name: "Teste da Silva",
            surname: "tsilva",
            phone: "(11)984512236",
            address: "Teste de Logradouro",
            cep: "06823120",
            origin: "user_node"
        }

        const mockPrismaClient = prismaClient.user.create = jest.fn().mockRejectedValue({
            'error': 'Error'
        });

        const userPrismaRepository = new UserPrismaRepository();

        expect(async () => {
            await userPrismaRepository.save(userMock);
        }).rejects.toThrowError('Database Service is Unavailable')
    })
});
