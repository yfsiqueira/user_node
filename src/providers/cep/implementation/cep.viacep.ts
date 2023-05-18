import { ICepAbstraction } from "../cep.abstraction";
import { CustomError } from "../../../errors/custom.error";
import { clientType, getCepDto } from "../dto/get-cep.dto";

export class CepViaCep implements ICepAbstraction {

    constructor(private request: clientType) { }
    async get(cep: string): Promise<getCepDto | null> {
        try {
            console.log(cep);
            const { data } = await this.request.get(`https://viacep.com.br/ws/${cep}/json/`);
            console.log(data);
            if (data.erro) {
                return null;
            }
            return data;
        } catch (error: any) {
            throw new CustomError("Invalid CEP passed to provider", 503, 'CEP_SERVICE_ERROR');
        }
    }
}