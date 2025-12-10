// __tests__/server.test.js
const request = require('supertest');
const createApp = require('../src/app'); // Importa a função que cria o app

let app;

beforeAll(() => {
  app = createApp(); // Cria o app para os testes
});

describe('Server API', () => {
  test('deve retornar QR Code em /api/qr', async () => {
    const response = await request(app).get('/api/qr');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('qr');
    expect(typeof response.body.qr).toBe('string');
  });

  test('deve validar QR Code via POST /api/validate-qr', async () => {
    // Primeiro, gere um QR Code
    const qrResponse = await request(app).get('/api/qr');
    const { sessionId } = JSON.parse(qrResponse.body.qr);

    const response = await request(app)
      .post('/api/validate-qr')
      .send({ sessionId, devicePublicKey: 'mock-key' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true });
  });

  test('deve retornar erro se QR Code for inválido', async () => {
    const response = await request(app)
      .post('/api/validate-qr')
      .send({ sessionId: 'invalid-session', devicePublicKey: 'mock-key' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'QR inválido ou expirado' });
  });
});