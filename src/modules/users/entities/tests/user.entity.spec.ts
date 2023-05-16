import { CustomError } from "../../../../errors/custom.error";
import { UserEntity } from "../user.entity";

describe('Entity User Tests', () => {
    test('Should be able to create a User', () => {
        const user = UserEntity.create({
            cep: '01111-111',
            name: 'Nameteste',
            surname: 'Surname Teste',
            phone: '(11)91111-1111'
        });

        expect(user).toBeInstanceOf(UserEntity);
        expect(user).toHaveProperty("id");

    });

    test('Should not be able to create a User without a name param', () => {
        expect(() => {
            UserEntity.create({
                cep: '01111-111',
                name: '',
                surname: 'Surname Test',
                phone: '(11)91111-1111'
            })
        }).toThrowError("Property 'name' is required");

    });

    test('Should not be able to create a User without a surname param', () => {
        expect(() => {
            UserEntity.create({
                cep: '01111-111',
                name: 'NameTest',
                surname: '',
                phone: '(11)91111-1111'
            })
        }).toThrowError("Property 'surname' is required");

    });

    test('Should not be able to create a User without a cep param', () => {
        expect(() => {
            UserEntity.create({
                cep: '',
                name: 'NameTest',
                surname: 'Surname Teste',
                phone: '(11)91111-1111'
            })
        }).toThrowError("Property 'cep' is required");

    });

    test('Should not be able to create a User without a cep param', () => {
        expect(() => {
            UserEntity.create({
                cep: '0111111',
                name: 'NameTest',
                surname: 'Surname Teste',
                phone: '(11)91111-1111'
            })
        }).toThrowError("Property 'cep' in invalid format");

    });

})