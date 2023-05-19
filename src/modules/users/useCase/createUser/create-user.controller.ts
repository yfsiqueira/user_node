import { Request, Response } from "express";
import { CreateUserUseCase } from "./create-user.usecase";
import { IUserRepository } from "./repositories/user.repository.interface";
import { ICepAbstraction } from "../../../../providers/cep/cep.abstraction";

export class CreateUserController {

    constructor(private userRepository: IUserRepository, private cepProvider: ICepAbstraction) { }

    async handle(request: Request, response: Response): Promise<void> {
        try {
            const useCase = new CreateUserUseCase(
                this.userRepository,
                this.cepProvider
            );
            const user = await useCase.execute(request.body);
            response.status(201).json(user);
        } catch (error: any) {
            response.status(error.statusCode).json({
                'error': error.message
            })
        }
    }
}