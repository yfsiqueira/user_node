import { CustomError } from "../../../../errors/custom.error";
import { ICepAbstraction } from "../../../../providers/cep/cep.abstraction";
import { UserEntity } from "../../entities/user.entity";
import { CreateUserUseCaseDto } from "./dto/create-user.dto";
import { UserPrismaRepository } from "./repositories/implementation/user.prisma.repository";
import { IUserRepository } from "./repositories/user.repository.interface";

export class CreateUserUserCase {
    constructor(private userRepository: IUserRepository, private cepProvider: ICepAbstraction) { }

    async execute(payload: CreateUserUseCaseDto): Promise<UserEntity> {
        const user = UserEntity.create(payload);

        const infoAddress = await this.cepProvider.get(payload.cep);
        if (!infoAddress) {
            throw new CustomError('CEP is invalid');
        }

        user.address = infoAddress.logradouro;
        await this.userRepository.save(user);
        return user;
    }
}