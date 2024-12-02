const express = require('express');
const routes = require('./routes');
const https = require('https');
const fs = require('fs');
require('dotenv').config();

const caminhoChaveHttps = process.env.CAMINHO_CHAVE_HTTPS;
const caminhoCertHttps = process.env.CAMINHO_CERT_HTTPS;

const app = express();
const port = process.env.PORTA;

if (caminhoChaveHttps == null && caminhoCertHttps == null){

    routes(app);

    app.listen(port, () => console.log(`servidor está rodando na porta ${port}`));
}else {
    const options = {
        key: fs.readFileSync(caminhoChaveHttps),
        cert: fs.readFileSync(caminhoCertHttps)
      };
        
    routes(app);
    
    https.createServer(options, app).listen(port, () => {
        console.log(`Servidor está rodando na porta ${port}`);
      });
}


module.exports = app;
