import axios from "axios";
import { ICepAbstraction } from "./cep.abstraction";

export class CepViaCep implements ICepAbstraction{
    async get(cep: string): Promise<any> {
        try {
            return await axios.get(`viacep.com.br/ws/${cep}/json/`)
        } catch (error) {
            
        }
    }
}