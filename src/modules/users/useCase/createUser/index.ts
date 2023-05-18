import axios from "axios";
import { CepViaCep } from "../../../../providers/cep/implementation/cep.viacep";
import { CreateUserController } from "./create-user.controller";
import { UserPrismaRepository } from "./repositories/implementation/user.prisma.repository";
import { IUserRepository } from "./repositories/user.repository.interface";
import { ICepAbstraction } from "../../../../providers/cep/cep.abstraction";

const userRepositoryDefault = new UserPrismaRepository();
const cepProviderDefault = new CepViaCep(axios);

// const createUserController = new CreateUserController(
//     userRepository,
//     cepProvider
// );

const createUserController = ((
    userRepository: IUserRepository = userRepositoryDefault,
    cepProvider: ICepAbstraction = cepProviderDefault) => {
    return new CreateUserController(userRepository, cepProvider);
});

export { createUserController };