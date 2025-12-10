// src/crypto.js
const sodium = require('libsodium-wrappers');

async function init() {
  await sodium.ready;
}

const deviceKeys = new Map(); // { sessionId: { publicKey, privateKey } }

async function generateIdentity(sessionId, devicePublicKey) {
  await init();
  const keyPair = sodium.crypto_box_keypair();
  deviceKeys.set(sessionId, {
    publicKey: sodium.to_base64(keyPair.publicKey),
    privateKey: sodium.to_base64(keyPair.privateKey),
    devicePublicKey
  });
}

module.exports = { generateIdentity };