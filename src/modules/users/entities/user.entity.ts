import { randomUUID } from "crypto";
import { CustomError } from "../../../errors/custom.error";

type IUser = {
    name: string
    surname: string
    phone: string
    address: string
    cep: string
}


export class UserEntity {
    id: string;
    name: string;
    surname: string;
    phone: string;
    address: string;
    cep: string;

    private constructor(properties: IUser) {
        this.id = randomUUID();
        this.name = properties.name;
        this.surname = properties.surname;
        this.phone = properties.phone;
        this.address = properties.address;
        this.cep = properties.cep;
    }

    static create(properties: IUser) {
        if (!properties.name) {
            throw new CustomError("Property 'name' is required", 422, 'REQUIRED_PARAMS')
        }
        if (!properties.surname) {
            throw new CustomError("Property 'surname' is required", 422, 'REQUIRED_PARAMS')
        }
        const user = new UserEntity(properties);
        return user;
    }
}