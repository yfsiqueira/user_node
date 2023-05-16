import { randomUUID } from "crypto";
import { CustomError } from "../../../errors/custom.error";

type IUser = {
    name: string
    surname: string
    phone: string
    cep: string
}


export class UserEntity {
    id: string;
    name: string;
    surname: string;
    phone: string;
    address: string;
    cep: string;
    origin: string;

    private constructor(properties: IUser) {
        this.id = randomUUID();
        this.name = properties.name;
        this.surname = properties.surname;
        this.phone = properties.phone;
        this.address = '';
        this.cep = properties.cep;
        this.origin = 'user_node';
    }

    static create(properties: IUser) {
        if (!properties.name) {
            throw new CustomError("Property 'name' is required", 422, 'REQUIRED_PARAMS')
        }
        if (!properties.surname) {
            throw new CustomError("Property 'surname' is required", 422, 'REQUIRED_PARAMS')
        }

        if (!properties.cep) {
            throw new CustomError("Property 'cep' is required", 422, 'REQUIRED_PARAMS')
        }

        if (!properties.cep.match(/^\d{5}[-]\d{3}$/)) {
            throw new CustomError("Property 'cep' in invalid format", 422, 'REQUIRED_PARAMS')
        }
        const user = new UserEntity(properties);
        return user;
    }
}