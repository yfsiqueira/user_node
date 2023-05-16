import { randomUUID } from "crypto";

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

        }
        if (!properties.surname) {

        }
        const user = new UserEntity(properties);
        return user;
    }
}