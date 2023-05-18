import { getCepDto } from "./dto/get-cep.dto";

export interface ICepAbstraction {
    get(cep: string): Promise<getCepDto | null>
}