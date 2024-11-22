const bodyParser = require('body-parser');


const boleto = require('./boletoRoute');

module.exports = app => {
  app.use(
    bodyParser.json(),
    boleto
  );
};
