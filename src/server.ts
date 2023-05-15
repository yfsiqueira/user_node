const express = require('express')
import "dotenv/config";
const app = express();

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`API RODANDO, PORTA: ${port}`)
});

