import axios from "axios";
import { ICepAbstraction } from "./cep.abstraction";
import { CustomError } from "../../errors/custom.error";
import { getCepDto } from "./dto/get-cep.dto";

export class CepViaCep implements ICepAbstraction {
    async get(cep: string): Promise<getCepDto | undefined> {
        try {
            const addres = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

            return addres.data
        } catch (error: any) {
            throw new CustomError("CEP service is Unavailable", 503, 'CEP_SERVICE_ERROR');
        }
    }
}