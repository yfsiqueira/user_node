import axios from "axios";
import { randomUUID } from "crypto";
import { CreateUserUseCase } from "../create-user.usecase";
import { UserPrismaRepository } from "../repositories/implementation/user.prisma.repository";
import { CepViaCep } from "../../../../../providers/cep/cep.viacep";
import { prismaClient } from "../../../../../infra/db/prisma.config";
import { CreateUserUseCaseDto } from "../dto/create-user.dto";

describe('Create User UseCase Tests', () => {
    test('Should be able to create a user', async () => {
        jest.mock('axios');

        const mockAxiosGet = axios.get = jest.fn().mockResolvedValue({
            data: {
                "cep": "01001-000",
                "logradouro": "Teste de Logradouro",
                "complemento": "lado ímpar",
                "bairro": "Sé",
                "localidade": "São Paulo",
                "uf": "SP",
                "ibge": "3550308",
                "gia": "1004",
                "ddd": "11",
                "siafi": "7107"
            }
        })

        const userMock = {
            id: randomUUID(),
            name: "Teste da Silva",
            surname: "tsilva",
            phone: "(11)984512236",
            address: "Teste de Logradouro",
            cep: "06823120",
            origin: "user_node",
            createdAt: "2023-05-16T20:22:34.254Z"
        }

        const mockPrismaClient = prismaClient.user.create = jest.fn().mockResolvedValue(userMock);

        const userRepository = new UserPrismaRepository();
        const cepProvider = new CepViaCep();

        const useCase = new CreateUserUseCase(userRepository, cepProvider);

        const payload: CreateUserUseCaseDto = {
            name: 'Teste da2222 Silva"',
            surname: "tsilva",
            phone: "(11)984512236",
            cep: "01001-000"
        }
        const result = await useCase.execute(payload);
        expect(result).toHaveProperty('id');
        expect(mockPrismaClient).toHaveBeenCalledTimes(1);
        expect(mockAxiosGet).toHaveBeenCalledTimes(1);

    });

    test('Should not be able to create a user whith a invalid cep with a correct format', async () => {
        jest.mock('axios');

        const mockAxiosGet = axios.get = jest.fn().mockResolvedValue({
            data: {
                "erro": true
            }
        })

        const userRepository = new UserPrismaRepository();
        const cepProvider = new CepViaCep();

        const useCase = new CreateUserUseCase(userRepository, cepProvider);

        const payload: CreateUserUseCaseDto = {
            name: 'Teste da2222 Silva"',
            surname: "tsilva",
            phone: "(11)984512236",
            cep: "01001-000"
        }

        expect(async () => {
            await useCase.execute(payload)
        }).rejects.toThrow('CEP is invalid');

    });

    test('Should not be able to create a user whith a invalid cep with a invalid format', async () => {
        jest.mock('axios');

        const mockAxiosGet = axios.get = jest.fn().mockRejectedValue({})

        const userRepository = new UserPrismaRepository();
        const cepProvider = new CepViaCep();

        const useCase = new CreateUserUseCase(userRepository, cepProvider);

        const payload: CreateUserUseCaseDto = {
            name: 'Teste da2222 Silva"',
            surname: "tsilva",
            phone: "(11)984512236",
            cep: "01001-000"
        }

        expect(async () => {
            await useCase.execute(payload)
        }).rejects.toThrow('Invalid CEP passed to provider');

    });
});