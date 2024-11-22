require('dotenv').config();

const { Client } = require('pg');

const cliente = new Client({
  user: process.env.DB_USUARIO,        // Obtém o usuário do arquivo .env
  password: process.env.DB_SENHA,      // Obtém a senha do arquivo .env
  host: process.env.DB_HOST,           // Obtém o host do arquivo .env
  port: process.env.DB_PORTA,          // Obtém a porta do arquivo .env
  database: process.env.DB_NAME,       // Obtém o nome do banco do arquivo .env
});

cliente.connect();

module.exports = cliente;
