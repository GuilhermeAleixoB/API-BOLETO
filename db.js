require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USUARIO,        // Obtém o usuário do arquivo .env
  password: process.env.DB_SENHA,      // Obtém a senha do arquivo .env
  host: process.env.DB_HOST,           // Obtém o host do arquivo .env
  port: process.env.DB_PORTA,          // Obtém a porta do arquivo .env
  database: process.env.DB_NAME,       // Obtém o nome do banco do arquivo .env
});

module.exports = pool;
