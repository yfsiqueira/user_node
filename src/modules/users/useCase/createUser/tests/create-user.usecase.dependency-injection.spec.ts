import axios from "axios";
import { randomUUID } from "crypto";
import { CreateUserUseCase } from "../create-user.usecase";
import { CreateUserUseCaseDto } from "../dto/create-user.dto";
import { clientType } from "../../../../../providers/cep/dto/get-cep.dto";
import { UserEntity } from "../../../entities/user.entity";
import { IUserRepository } from "../repositories/user.repository.interface";

jest.mock('axios');

describe('Create User UseCase Tests', () => {
    test('Should be able to create a user', async () => {
        const fakeRequest: clientType = {
            get(): Promise<any> {
                return Promise.resolve({
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
                });
            }
        }

        const userId = randomUUID();

        const fakeRepository: IUserRepository = {
                save(): Promise<UserEntity> {
                    return Promise.resolve({
                        id: userId,
                        name: "Teste da Silva",
                        surname: "tsilva",
                        phone: "(11)984512236",
                        address: "Teste de Logradouro",
                        cep: "01001-000",
                        origin: "user_node",
                        createdAt: "2023-05-17T20:22:34.254Z"
                    });
                }
            }
        const useCase = new CreateUserUseCase(fakeRepository, fakeRequest);

        const payload: CreateUserUseCaseDto = {
            name: "Teste da Silva",
            surname: "tsilva",
            phone: "(11)984512236",
            cep: "06823-120",
        }

        const result = await useCase.execute(payload);
        expect(result).toHaveProperty('id');
        expect(result.id).toEqual(userId);
    });

    test('Should not be able to create a user whith a invalid cep with a correct format', async () => {
        const fakeRequest: clientType = {
            get(): Promise<any> {
                return Promise.resolve(null);
            }
        }

        const fakeRepository: IUserRepository = {
            save(): Promise<UserEntity> {
                throw new Error();
            }
        }

        const useCase = new CreateUserUseCase(fakeRepository, fakeRequest);

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
});