// src/qr-manager.js
const QRCode = require('qrcode');
const crypto = require('crypto');

const activeQRCodes = new Map();
const qrTimeouts = new Map(); // Armazena referências dos timeouts

function generateQR() {
  const sessionId = crypto.randomUUID();
  const timestamp = Date.now();
  const qrContent = JSON.stringify({ sessionId, timestamp });

  activeQRCodes.set(sessionId, { timestamp, used: false });

  const timeoutId = setTimeout(() => {
    if (!activeQRCodes.get(sessionId).used) {
      activeQRCodes.delete(sessionId);
    }
    qrTimeouts.delete(sessionId);
  }, 20000);

  qrTimeouts.set(sessionId, timeoutId);

  return qrContent;
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

// Função para limpar timeouts (útil para testes)
function clearAllTimeouts() {
  for (let [id, timeoutId] of qrTimeouts) {
    clearTimeout(timeoutId);
  }
  qrTimeouts.clear();
  activeQRCodes.clear();
}

module.exports = { generateQR, validateQR, clearAllTimeouts };