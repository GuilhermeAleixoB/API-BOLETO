/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-await-in-loop */
const banco = require('../db.js');
const QRCode = require('qrcode');

class BoletoController {
  static async BoletoQRCode(req, res) {
    const cod = req.query.cod;
    try {

        const boleto = await banco.query(`select bol_st_qrcode
                                    from hpxsis.exe_boleto
                                    where bol_in_sequencia = $1`, [cod]);
        const codigoqr = (boleto.rows[0].bol_st_qrcode);
            try {
                QRCode.toDataURL(codigoqr, { width: 128, height: 128 }, async (err, url) => {
                    if (err) console.error(err);
                    console.log(url);
                    const base64Data = url.split(',')[1]; 

                    const buffer = Buffer.from(base64Data, 'base64');
                    await banco.query(`UPDATE hpxsis.exe_boleto
                                       SET bol_st_imgqrcode = $1
                                       WHERE bol_in_sequencia = $2`, [buffer, cod]);
                                       
                                       
                    return res.status(200).json({ status: "OK" });
           
                });                
            } catch (error) {
                console.error('Erro ao gerar QR Code:', error);
            }

      }catch (error) {
        return res.status(500).json(error.message);
      }
  }

}

module.exports = BoletoController;
