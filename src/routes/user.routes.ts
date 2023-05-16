import { Request, Response, Router } from "express";
import { CreateUserController } from "../modules/users/useCase/createUser/create-user.controller";
import { createUserController } from "../modules/users/useCase/createUser";

const userRouter = Router();

userRouter.post('/users', async (request: Request, response: Response) => {
    await createUserController.handle(request, response);
});

export { userRouter };

