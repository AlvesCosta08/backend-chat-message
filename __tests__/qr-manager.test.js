// __tests__/qr-manager.test.js
const { generateQR, validateQR, clearAllTimeouts } = require('../src/qr-manager');

afterEach(() => {
  clearAllTimeouts(); // Limpa timeouts após cada teste
});

describe('QR Manager', () => {
  test('deve gerar um QR Code com sessionId e timestamp', () => {
    const qrData = generateQR();
    const parsed = JSON.parse(qrData);

    expect(parsed).toHaveProperty('sessionId');
    expect(parsed).toHaveProperty('timestamp');
    expect(typeof parsed.sessionId).toBe('string');
    expect(typeof parsed.timestamp).toBe('number');
  });

  test('deve validar QR Code válido', () => {
    const qrData = generateQR();
    const { sessionId } = JSON.parse(qrData);

    const isValid = validateQR(sessionId);

    expect(isValid).toBe(true);
  });

  test('não deve validar QR Code expirado', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(Date.now() - 21000)); // 21 segundos atrás

    const qrData = generateQR();
    const { sessionId } = JSON.parse(qrData);

    jest.useRealTimers();

    const isValid = validateQR(sessionId);

    expect(isValid).toBe(false);
  });

  test('não deve validar QR Code usado', () => {
    const qrData = generateQR();
    const { sessionId } = JSON.parse(qrData);

    // Primeira validação
    validateQR(sessionId);

    // Segunda tentativa
    const isValid = validateQR(sessionId);

    expect(isValid).toBe(false);
  });
});