## Esta API permite obter um pix "copie e cole", transformá-lo em um QRCODE e guardar em uma tabela do Banco de Dados PostgreSQL (/boletoQRCode) ou recriar um PDF com senha usando o QPDF (/boletoSenha)

### INSTRUÇÕES DE INSTALAÇÃO:
- Instalar o NPM usando o terminal do Windows: `npm install -g npm`
- Baixar o node no link: https://nodejs.org/pt
- Verificar a instalação usando `node -v` e `npm -v` no terminal do Windows
- Descompactar a API
- Instalar o QPDF (necessário para a criação de PDF com senha) usando o link: https://sourceforge.net/projects/qpdf/files/


### CONFIGURAÇÕES DENTRO DA PASTA DA API

- Instalar dependências usando o terminal do Windows: `npm install`

- Criar o arquivo .ENV seguindo o Exemplo:  
_PORTA=3000  
DB_USUARIO=usuario  
DB_SENHA=senha  
DB_HOST=127.0.0.1  
DB_PORTA=0000  
DB_NAME=nome_do_banco  
CAMINHO_CHAVE_HTTPS=  
CAMINHO_CERT_HTTPS=_

### INICIANDO A API
- Iniciar a API: `node index.js`
- Se a mensagem "servidor está rodando na porta" aparecer a API está funcionando corretamente 

### MANTENDO A API RODANDO APÓS REINICIALIZAÇÕES
- Instalar o pm2-windows-startup: `npm install pm2-windows-startup -g`
- Registrar a API para iniciar automaticamente: `pm2-startup install`
- Salvar a configuração: `pm2 save`

### INICIANDO A API USANDO O PM2
- Utilizar o seguinte comando no terminal do Windows: `pm2 start index.js --name "API de Boletos" --watch`

### PARANDO TODAS AS APIs EM EXECUÇÃO
- Utilizar o seguinte comando no terminal do Windows: `pm2 delete all`
- Utilizar o seguinte comando no terminal do Windows: `pm2 save`  