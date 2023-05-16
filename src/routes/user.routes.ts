import { Request, Response, Router } from "express";
import { CreateUserController } from "../modules/users/useCase/createUser/create-user.controller";

const userRouter = Router();

userRouter.post('/users', (request: Request, response: Response) => {
    new CreateUserController().handle(request, response);
});


export { userRouter };

