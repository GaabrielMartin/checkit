import request from 'supertest';
import app from '../index';

describe('Validation API', () => {
  describe('POST /api/v1/validate/cpf', () => {
    it('should validate a valid CPF', async () => {
      const response = await request(app)
        .post('/api/v1/validate/cpf')
        .send({ value: '123.456.789-09' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.isValid).toBe(true);
      expect(response.body.data.message).toBe('CPF válido');
    });

    it('should reject invalid CPF', async () => {
      const response = await request(app)
        .post('/api/v1/validate/cpf')
        .send({ value: '123.456.789-10' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.isValid).toBe(false);
      expect(response.body.data.message).toBe('CPF inválido');
    });

    it('should return 400 for missing value', async () => {
      await request(app)
        .post('/api/v1/validate/cpf')
        .send({})
        .expect(400);
    });
  });

  describe('POST /api/v1/validate/email', () => {
    it('should validate a valid email', async () => {
      const response = await request(app)
        .post('/api/v1/validate/email')
        .send({ value: 'test@example.com' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.isValid).toBe(true);
    });

    it('should reject invalid email', async () => {
      const response = await request(app)
        .post('/api/v1/validate/email')
        .send({ value: 'invalid-email' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.isValid).toBe(false);
    });
  });

  describe('GET /api/v1/validate/generate/cpf', () => {
    it('should generate a valid CPF', async () => {
      const response = await request(app)
        .get('/api/v1/validate/generate/cpf')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.value).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
    });
  });

  describe('GET /api/v1/health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/api/v1/health')
        .expect(200);

      expect(response.body.status).toBe('ok');
      expect(response.body.timestamp).toBeDefined();
    });
  });
});
