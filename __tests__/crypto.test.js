// __tests__/crypto.test.js
const { generateIdentity } = require('../src/crypto');

// Mock libsodium
jest.mock('libsodium-wrappers', () => ({
  ready: Promise.resolve(),
  to_base64: jest.fn().mockReturnValue('mocked-base64-key'),
  crypto_box_keypair: jest.fn().mockReturnValue({
    publicKey: new Uint8Array(32),
    privateKey: new Uint8Array(32)
  })
}));

describe('Crypto Manager', () => {
  test('deve gerar identidade criptográfica para um sessionId', async () => {
    const sessionId = 'test-session-id';
    const devicePublicKey = 'mock-device-key';

    await generateIdentity(sessionId, devicePublicKey);

    // Aqui você pode adicionar uma verificação se a identidade foi armazenada
    // Ex: verificar se uma variável global ou módulo foi alterado
    // Isso dependerá de como você armazena os dados (ex: variável global ou módulo externo)
  });
});