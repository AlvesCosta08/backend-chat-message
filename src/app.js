// src/app.js
const express = require('express');
const qrManager = require('./qr-manager');
const crypto = require('./crypto');

function createApp() {
  const app = express();

  app.use(express.json());

  // Rota para gerar QR Code
  app.get('/api/qr', (req, res) => {
    const qrData = qrManager.generateQR();
    res.json({ qr: qrData });
  });

  // Valida QR Code escaneado pelo mobile
  app.post('/api/validate-qr', express.json(), (req, res) => {
    const { sessionId, devicePublicKey } = req.body;

    if (qrManager.validateQR(sessionId)) {
      // Simula registro do dispositivo no mobile
      crypto.generateIdentity(sessionId, devicePublicKey);
      res.json({ success: true });
    } else {
      res.status(400).json({ error: 'QR inválido ou expirado' });
    }
  });

  return app;
}

module.exports = createApp;