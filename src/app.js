// src/app.js
const express = require('express');
const qrManager = require('./qr-manager');
const crypto = require('./crypto');
const cors = require('cors');

function createApp() {
  const app = express();

  app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  app.use(express.json());

  // Rota para gerar QR Code
  app.get('/api/qr', (req, res) => {
    const qrData = qrManager.generateQR();
    console.log('📱 QR Code gerado:', qrData);
    res.json({ qr: qrData });
  });

  // Rota para health check
  app.get('/api/health', (req, res) => { // Adicione esta rota
    res.status(200).json({ status: 'ok', timestamp: Date.now() });
  });

  // Rota de health check alternativa (mantendo a antiga também, se quiser)
  app.get('/health', (req, res) => {
    res.json({ 
      status: 'OK', 
      service: 'MeuChat Backend',
      timestamp: new Date().toISOString()
    });
  });

  // Valida QR Code escaneado pelo mobile
  app.post('/api/validate-qr', express.json(), (req, res) => {
    const { sessionId, devicePublicKey } = req.body;
    console.log('🔍 Validando QR:', { sessionId, devicePublicKey });

    if (qrManager.validateQR(sessionId)) {
      crypto.generateIdentity(sessionId, devicePublicKey);
      res.json({ success: true, message: 'QR validado com sucesso' });
    } else {
      res.status(400).json({ error: 'QR inválido ou expirado' });
    }
  });

  app.options('*', cors());

  return app;
}

module.exports = createApp;