import { Request, Response } from "express";
import { CreateUserUserCase } from "./create-user.usecase";

export class CreateUserController {
    handle(request: Request, response: Response): any {
        try {
            const useCase = new CreateUserUserCase();
            const user = useCase.execute(request.body);
        } catch (error: any) {
            response.json(error.statusCode).end({
                'error': error.message
            })
        }
    }
}