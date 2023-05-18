import { clientType } from "../dto/get-cep.dto";
import { CepViaCep } from "../implementation/cep.viacep";

describe('ViaCep Providers Tests', () => {
    test('Should return address info correctly', async () => {
        const fakeRequest: clientType = {
            get(url: string): Promise<any> {
                return Promise.resolve({
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
            }
        }

        const viaCepProvider = new CepViaCep(fakeRequest);
        const getCep = await viaCepProvider.get('string_url');

        expect(getCep).toHaveProperty('logradouro');
        expect(getCep?.bairro).toEqual('Sé');

    });

    test('Should return null if passed a invalid cep with correct format', async () => {
        const fakeRequest: clientType = {
            get(url: string): Promise<any> {
                return Promise.resolve({
                    "data": {
                        "erro": true
                    }
                });
            }
        }

        const viaCepProvider = new CepViaCep(fakeRequest);
        const getCep = await viaCepProvider.get('string_url');

        expect(getCep).toEqual(null);

    });

    test('Should throw a error if passed a invalid cep with incorrect format', async () => {
        const fakeRequest: clientType = {
            get(url: string): Promise<any> {
                return Promise.reject({
                    "message": 'Error',
                    'statusCode': '400'
                });
            }
        }

        expect(async () => {
            const viaCepProvider = new CepViaCep(fakeRequest);
            await viaCepProvider.get('string_url');
        }).rejects.toThrow('Invalid CEP passed to provider');

    });
});