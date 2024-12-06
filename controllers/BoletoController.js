const banco = require('../db.js');
const QRCode = require('qrcode');
const { exec } = require('child_process');
const path = require('path');


class BoletoController {
  static async BoletoQRCode(req, res) {
    const cod = req.query.cod;
    let conexao;
    
    try {
      conexao = await banco.connect();
      const boleto = await conexao.query(`SELECT bol_st_qrcode
                                          FROM hpxsis.exe_boleto
                                          WHERE bol_in_sequencia = $1`, [cod]);
      const codigoqr = boleto.rows[0].bol_st_qrcode;

      try {
        QRCode.toDataURL(codigoqr, { width: 128, height: 128 }, async (err, url) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ status: 'Erro ao gerar QR Code' });
          }
          const base64Data = url.split(',')[1]; 

          const buffer = Buffer.from(base64Data, 'base64');
          await conexao.query(`UPDATE hpxsis.exe_boleto
                               SET bol_st_imgqrcode = $1
                               WHERE bol_in_sequencia = $2`, [buffer, cod]);
          return res.status(200).json({ status: "OK" });
        });

      } catch (error) {
        console.error('Erro ao gerar QR Code:', error);
        return res.status(500).json({ status: 'Erro ao gerar QR Code' });
      }

    } catch (error) {
      console.error('Erro ao conectar ao banco de dados:', error);
      return res.status(500).json({ status: 'Erro ao conectar ao banco de dados' });
    } finally {
      if (conexao) {
        conexao.release();
      }
    }
  }

  
    static async BoletoSenha(req, res) {
      const linkOri = req.get('linkOri'); // Caminho do PDF original
      const linkDes = req.get('linkDes'); // Caminho do PDF destino com senha
      const senha = req.get('senha'); // Senha para proteger o PDF
      
      if (!linkOri || !linkDes || !senha) {
        return res.status(400).json({ message: 'Parâmetros incompletos. Certifique-se de enviar "linkOri", "linkDes" e "senha".' });
      }
      
      const comando = `qpdf --encrypt  ${senha} ${senha} 256 -- "${linkOri}" "${linkDes}"`;
      
      const options = { windowsHide: true }; 
      
      exec(comando, options, (erro, stdout, stderr) => {
    if (erro) {
      console.error('Erro ao proteger o PDF:', erro.message);
      return;
    }
    if (stderr) {
      console.error('stderr:', stderr);
      return;
    }
    console.log(`PDF protegido com sucesso em: ${linkDes}`);
  });


    }
  
}

module.exports = BoletoController;
