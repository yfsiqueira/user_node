import { CepViaCep } from "../../../../providers/cep/cep.viacep";
import { CreateUserController } from "./create-user.controller";
import { UserPrismaRepository } from "./repositories/implementation/user.prisma.repository";

const userRepository = new UserPrismaRepository();
const cepProvider = new CepViaCep();

const createUserController = new CreateUserController(
    userRepository,
    cepProvider
);

export { createUserController };