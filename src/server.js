// src/server.js
const createApp = require('./app'); // Importa a função que cria o app
const WebSocket = require('ws');
const http = require('http');

function createServer() {
  const app = createApp(); // Cria o app Express
  const server = http.createServer(app); // Cria o servidor HTTP
  const wss = new WebSocket.Server({ server }); // Anexa o WebSocket

  wss.on('connection', (ws) => {
    ws.on('message', (data) => {
      const message = JSON.parse(data);

      if (message.type === 'register') {
        ws.sessionId = message.sessionId;
        console.log('Dispositivo conectado:', ws.sessionId);
      }

      if (message.type === 'message') {
        // Roteia mensagem para outros dispositivos conectados
        wss.clients.forEach(client => {
          if (client !== ws && client.sessionId && client.sessionId !== message.fromSessionId) {
            client.send(JSON.stringify(message));
          }
        });
      }
    });
  });

  return { app, server, wss };
}

// SÓ INICIA O SERVIDOR SE NÃO ESTIVER NO JEST
if (require.main === module || process.env.NODE_ENV === 'production') {
  const { server } = createServer();
  const PORT = process.env.PORT || 3001;
  server.listen(PORT, () => {
    console.log(`Backend rodando em http://localhost:${PORT}`);
  });
} else {
  // Exportar a função para testes
  module.exports = createServer;
}