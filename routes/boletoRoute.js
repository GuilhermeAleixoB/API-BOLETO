const  { Router } = require('express');
const BoletoController = require('../controllers/BoletoController');

const router = Router();
router
  .post('/boletoQRCode', BoletoController.BoletoQRCode)
  .post('/boletoSenha', BoletoController.BoletoSenha);
  
module.exports = router;
