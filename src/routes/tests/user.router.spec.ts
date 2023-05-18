import { mockClear } from "jest-mock-extended";
import { randomUUID } from "crypto";
import { app } from "../../app";
import { prismaClient } from "../../infra/db/prisma.config";
import { SuperTest } from "supertest";
const supertest = require("supertest");
const nock = require("nock");

describe('Integration Test user', () => {
    let request: SuperTest<any>;
    let mockRepository: jest.Mock<any, any, any>;
    beforeAll(() => {
        mockRepository = prismaClient.user.create = jest.fn()
        request = supertest(app);
    });

    afterEach(() => {
        nock.cleanAll();
    })

    beforeEach(() => {
        mockClear(mockRepository)
    })

    test('Should be able to create a user', async () => {
        mockRepository.mockResolvedValue({
            id: randomUUID(),
            name: "Teste da Silva",
            surname: "tsilva",
            phone: "(11)984512236",
            address: "Teste de Logradouro",
            cep: "06823-120",
            origin: "user_node"
        })

        const scope = nock('https://viacep.com.br')
            .get(`/ws/06823-120/json/`)
            .reply(200, {
                "data": {
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
            });

        await request.post('/users').send({
            "name": "Teste da Testes",
            "surname": "tsilva",
            "phone": "(11)987277767",
            "cep": "06823-120"
        }).expect(201);
    });

    test('Should return a 422 http status code with incorrect format CEP', async () => {
        const response = await request.post('/users').send({
            "name": "Teste da Testes",
            "surname": "tsilva",
            "phone": "(11)987277767",
            "cep": "00000-00"
        }).expect(422, {
            error: "Property 'cep' in invalid format",
        });
    });

    test('Should be able to create a user', async () => {
        mockRepository.mockRejectedValue({});

        const scope = nock('https://viacep.com.br')
            .get(`/ws/06823-120/json/`)
            .reply(200, {
                "data": {
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
            });

        await request.post('/users').send({
            "name": "Teste da Testes",
            "surname": "tsilva",
            "phone": "(11)987277767",
            "cep": "06823-120"
        }).expect(503, {
            error: 'Database Service is Unavailable'
        });
    });
});