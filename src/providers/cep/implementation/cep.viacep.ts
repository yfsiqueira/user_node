import { ICepAbstraction } from "../cep.abstraction";
import { CustomError } from "../../../errors/custom.error";
import { clientType, getCepDto } from "../dto/get-cep.dto";

export class CepViaCep implements ICepAbstraction {

    constructor(private request: clientType) { }
    async get(cep: string): Promise<getCepDto | null> {
        try {
            const { data } = await this.request.get(`https://viacep.com.br/ws/${cep}/json/`);
            if (data.erro) {
                return null;
            }
            console.log(data);
            return data;
        } catch (error: any) {
            console.log(error);
            throw new CustomError("Invalid CEP passed to provider", 400);
        }
    }
}