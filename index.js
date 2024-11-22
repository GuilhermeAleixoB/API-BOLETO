const express = require('express');
const routes = require('./routes');
require('dotenv').config();

const app = express();
const port = process.env.PORTA;

routes(app);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`servidor está rodando na porta ${port}`));

module.exports = app;
