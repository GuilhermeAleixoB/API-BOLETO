const banco = require('../db.js');
const QRCode = require('qrcode');
const { exec } = require('child_process');
const path = require('path');


class BoletoController {
  static async BoletoQRCode(req, res) {
    //Obtem o código do boleto que está no link
    const cod = req.query.cod;
    let conexao;
    
    try {
      //Inicia a conexão com o Banco de Dados
      conexao = await banco.connect();

      //Faz o Select das informações que terão no QRCODE
      const boleto = await conexao.query(`SELECT bol_st_qrcode
                                          FROM hpxsis.exe_boleto
                                          WHERE bol_in_sequencia = $1`, [cod]);
      const codigoqr = boleto.rows[0].bol_st_qrcode;

      try {
        //Gera o QRCODE
        QRCode.toDataURL(codigoqr, { width: 128, height: 128 }, async (err, url) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ status: 'Erro ao gerar QR Code' });
          }
          //Guarda o BASE64 da imagem do QRCODE
          const base64Data = url.split(',')[1]; 

          //Guarda o binário da imagem no Banco de Dados
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

        //Fecha a conexão
        conexao.release();
      }
    }
  }

  
  static async BoletoSenha(req, res) {
    //Guarda as informações que vieram pelo JSON do corpo
    const { linkOri, linkDes, senha } = req.body; 
  
    //Valida se vieram todas as informações necessárias no JSON
    if (!linkOri || !linkDes || !senha) {
      return res.status(400).json({ 
        message: 'Parâmetros incompletos. Certifique-se de enviar "linkOri", "linkDes" e "senha".' 
      });
    }
  
    //Monta o comando do qpdf
    const comando = `qpdf --encrypt ${senha} ${senha} 256 -- "${linkOri}" "${linkDes}"`;
    
    //Configura para ocultar a janela do CMD no Windows
    const options = { windowsHide: true };
  
    //Executa o comando
    exec(comando, options, (erro, stdout, stderr) => {
      if (erro) {
        console.error('Erro ao proteger o PDF:', erro.message);
        return res.status(500).json({ status: erro.message });
      }
      if (stderr) {      
        console.error('stderr:', stderr);
        return res.status(500).json({ status: stderr });
      }
  
      console.log(`PDF protegido com sucesso em: ${linkDes}`);
      return res.status(200).json({ status: "OK" });
    });
  }
  
}

module.exports = BoletoController;
