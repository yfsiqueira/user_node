import axios from "axios";
import { ICepAbstraction } from "./cep.abstraction";
import { CustomError } from "../../errors/custom.error";
import { getCepDto, getCepErrorDto } from "./dto/get-cep.dto";

export class CepViaCep implements ICepAbstraction {
    async get(cep: string): Promise<getCepDto| null> {
        try {
            const address= await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            if(address.data.erro){
                return null;
            }
            return address.data
        } catch (error: any) {
            throw new CustomError("Invalid CEP passed to provider", 503, 'CEP_SERVICE_ERROR');
        }
    }
}