// const express = require('express')
// import "dotenv/config";
// import { userRouter } from "./routes/user.routes";
// const app = express();
// app.use(express.json());

import { app } from "./app";
import "dotenv/config";
const port = process.env.PORT || 4000;

// app.use(userRouter);

// const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`API RODANDO, PORTA: ${port}`)
});

