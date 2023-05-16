import { UserEntity } from "../user.entity";

describe('Entity User Tests', () => {
    test('Should be able to create a User', () => {
        const user = UserEntity.create({
            address: "Rua teste",
            cep:'01111-111',
            name: 'Nameteste',
            surname: 'Surname Teste',
            phone:'(11)91111-1111'
        });

        expect(user).toBeInstanceOf(UserEntity);
        expect(user).toHaveProperty("id");

    });
})