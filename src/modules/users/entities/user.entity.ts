type IUser = {
    name: string
    surname: string
    phone: string
    address: string
    cep: string
}


export class UserEntity {
    private name: string;
    private surname: string;
    private phone: string;
    private address: string;
    private cep: string;

    constructor({name, surname, phone, address, cep}: IUser) {
        this.name = name;
        this.surname = surname;
        this.phone = phone;
        this.address = address;
        this.cep = cep;
    }

    


}