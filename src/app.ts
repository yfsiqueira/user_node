const express = require('express')
import { userRouter } from "./routes/user.routes";
const app = express();
app.use(express.json());

app.use(userRouter);

export { app }