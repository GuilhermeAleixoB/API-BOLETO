## Essa API é para obter um pix "copie e cola", transformar em um QRCODE e gravar em um campo de uma tabela do PostgreSQL (é o /boletoQRCode) ou recriar um pdf porem colocando senha nele usando o QPDF (é o /boletoSenha)

### INSTALAÇÃO:
- Baixar o npm usando o comando no cmd do windows: `npm install -g npm`
- Baixar o node no link: https://nodejs.org/pt
- Instalar o node em "Arquivos de Programas" (é o default)
- Verificar a instalação usando `node -v` e `npm -v` no prompt (Em qualquer pasta)
- Descompacta o arquivo api.zip (pode deixar essa pasta em qualquer lugar)
- Para funcionar a senha no PDF precisa baixar o QPDF no link: https://sourceforge.net/projects/qpdf/files/


### TODOS OS PRÓXIMOS PASSOS SÃO DENTRO DA PASTA DA API

- Para instalar as dependências: `npm install`

- Criar arquivo .ENV e configurar o banco e a Porta da API inserindo dentro dele:  
_PORTA=3000  
DB_USUARIO=usuario  
DB_SENHA=senha  
DB_HOST=127.0.0.1  
DB_PORTA=0000  
DB_NAME=nome_do_banco  
CAMINHO_CHAVE_HTTPS=  
CAMINHO_CERT_HTTPS=_

### Para iniciar a API
- Rodar no prompt: `node index.js`
- Caso apareça "servidor está rodando na porta" é porque está certo

### Para iniciar a API e deixar para mesmo ao reiniciar a máquina ou servidor a api reinicie junto
-Rodar o prompt: `pm2 start index.js --name "API de Boletos" --watch`

### Para deixar ele executar sempre ao iniciar o windows automaticamente
- Rodar o prompt: `npm install pm2-windows-startup -g` (Apenas na primeira vez)
- Rodar o prompt: `pm2-startup install`
- Rodar o prompt: `pm2 save`

### Caso queira parar de executar ao iniciar o windows
- Rodar o prompt: `pm2 delete all`
- Rodar o prompt: `pm2 save` 