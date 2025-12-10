# Backend

Backend do MeuChat, um sistema de mensagens em tempo real inspirado no WhatsApp Web, com foco em segurança e sincronização entre dispositivos.

## ✨ Funcionalidades

- Geração e validação de QR Code para sincronização com dispositivos móveis
- API RESTful para gerenciamento de sessões
- WebSocket para comunicação em tempo real
- Criptografia de ponta a ponta (simulação)
- Testes unitários com Jest
- Pronto para deploy com Docker

## 🧱 Estrutura de Arquivos

```

backend/
├── tests/ # Testes unitários
│ ├── crypto.test.js
│ ├── qr-manager.test.js
│ └── server.test.js
├── src/ # Código-fonte principal
│ ├── app.js # Configuração do Express
│ ├── server.js # Inicialização do servidor HTTP e WebSocket
│ ├── qr-manager.js # Lógica de geração e validação de QR
│ └── crypto.js # Lógica de criptografia (simulada)
├── jest.config.js # Configuração do Jest
├── Dockerfile # Imagem Docker
├── package.json
└── README.md



```


## 🚀 Execução Local

### 1. Pré-requisitos

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [npm](https://www.npmjs.com/)

### 2. Instalação

1.  Clone o repositório (ou navegue até a pasta `backend`).
2.  Instale as dependências:

    ```bash
    npm install
    ```

### 3. Executar o Servidor

```bash
npm start

Executar Testes

npm test

🐳 Executar com Docker
1. Build da Imagem

docker build -t backend .



Qwen3-Coder
9:22 AM
Claro! Aqui está um exemplo de README.md para o backend do MeuChat, incluindo as informações sobre testes, Docker e estrutura do projeto:

📄 backend/README.md
markdown
123456789101112131415
# MeuChat Backend

Backend do MeuChat, um sistema de mensagens em tempo real inspirado no WhatsApp Web, com foco em segurança e sincronização entre dispositivos.

## ✨ Funcionalidades

- Geração e validação de QR Code para sincronização com dispositivos móveis
- API RESTful para gerenciamento de sessões
- WebSocket para comunicação em tempo real
- Criptografia de ponta a ponta (simulação)

backend/
├── tests/ # Testes unitários
│ ├── crypto.test.js
│ ├── qr-manager.test.js
│ └── server.test.js
├── src/ # Código-fonte principal
│ ├── app.js # Configuração do Express
│ ├── server.js # Inicialização do servidor HTTP e WebSocket
│ ├── qr-manager.js # Lógica de geração e validação de QR
│ └── crypto.js # Lógica de criptografia (simulada)
├── jest.config.js # Configuração do Jest
├── Dockerfile # Imagem Docker
├── package.json
└── README.md

123456789101112131415161718192021

## 🚀 Execução Local

### 1. Pré-requisitos

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [npm](https://www.npmjs.com/)

### 2. Instalação


O servidor subirá em http://localhost:3001.

4. Executar Testes

npm test
1Para rodar os testes e verificar handles abertos:

bash
1npm test -- --detectOpenHandles

🐳 Executar com Docker
1. Build da Imagem

2. Executar o Contêiner

docker run -p 3001:3001 backend
🧪 Testes Unitários
Framework: Jest
Biblioteca de Teste de API: supertest
Cobertura: Configurada para ignorar o arquivo src/server.js, que contém a lógica de inicialização do servidor.
Os testes cobrem:

qr-manager.js: Geração e validação de QR Code.
crypto.js: Geração de identidade criptográfica.
app.js: Rotas da API (via supertest).


🔐 Segurança
Criptografia de ponta a ponta simulada com libsodium.
Validação rigorosa de sessões via QR Code.
Tempo de expiração para QR Codes não utilizados.

🚧 Em Desenvolvimento
Integração com banco de dados para persistência de mensagens.
Implementação completa do protocolo Signal para criptografia.
Autenticação de usuários.

🤝 Contribuindo
Fique à vontade para abrir issues e pull requests.# backend-chat-message
