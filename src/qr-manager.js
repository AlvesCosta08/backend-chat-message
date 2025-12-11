const QRCode = require('qrcode');
const crypto = require('crypto');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'; // Altere aqui
const activeQRCodes = new Map();
const qrTimeouts = new Map();

function generateQR() {
  const sessionId = crypto.randomUUID();
  const timestamp = Date.now();
  // Gera URL completa com IP ou localhost
  const qrContent = `${BASE_URL}/chat/${sessionId}`;

  activeQRCodes.set(sessionId, { timestamp, used: false });

  const timeoutId = setTimeout(() => {
    if (!activeQRCodes.get(sessionId).used) {
      activeQRCodes.delete(sessionId);
    }
    qrTimeouts.delete(sessionId);
  }, 20000);

  qrTimeouts.set(sessionId, timeoutId);

  return qrContent; // Retorna a URL completa
}

function validateQR(sessionId) {
  const qr = activeQRCodes.get(sessionId);
  if (!qr || qr.used || Date.now() - qr.timestamp > 20000) {
    const timeoutId = qrTimeouts.get(sessionId);
    if (timeoutId) {
      clearTimeout(timeoutId);
      qrTimeouts.delete(sessionId);
    }
    return false;
  }
  const timeoutId = qrTimeouts.get(sessionId);
  if (timeoutId) {
    clearTimeout(timeoutId);
    qrTimeouts.delete(sessionId);
  }
  qr.used = true;
  return true;
}

function clearAllTimeouts() {
  for (let [id, timeoutId] of qrTimeouts) {
    clearTimeout(timeoutId);
  }
  qrTimeouts.clear();
  activeQRCodes.clear();
}

module.exports = { generateQR, validateQR, clearAllTimeouts };