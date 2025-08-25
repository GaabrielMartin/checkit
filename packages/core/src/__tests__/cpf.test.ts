import { validateCpf, generateCpf } from '../validators/cpf';

describe('CPF Validator', () => {
  describe('validateCpf', () => {
    it('should validate a correct CPF', () => {
      const result = validateCpf('123.456.789-09');
      expect(result.isValid).toBe(true);
      expect(result.message).toBe('CPF válido');
      expect(result.value).toBe('123.456.789-09');
    });

    it('should validate CPF without formatting', () => {
      const result = validateCpf('12345678909');
      expect(result.isValid).toBe(true);
      expect(result.value).toBe('123.456.789-09');
    });

    it('should reject invalid CPF', () => {
      const result = validateCpf('123.456.789-10');
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('CPF inválido');
    });

    it('should reject CPF with wrong length', () => {
      const result = validateCpf('123.456.789');
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('CPF deve ter 11 dígitos');
    });

    it('should reject CPF with all same digits', () => {
      const result = validateCpf('111.111.111-11');
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('CPF inválido');
    });

    it('should handle empty value', () => {
      const result = validateCpf('');
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('CPF é obrigatório');
    });

    it('should allow empty value when configured', () => {
      const result = validateCpf('', { allowEmpty: true });
      expect(result.isValid).toBe(true);
      expect(result.value).toBe('');
    });

    it('should use custom message', () => {
      const result = validateCpf('', { customMessage: 'CPF customizado é obrigatório' });
      expect(result.isValid).toBe(false);
      expect(result.message).toBe('CPF customizado é obrigatório');
    });
  });

  describe('generateCpf', () => {
    it('should generate a valid CPF', () => {
      const cpf = generateCpf();
      const result = validateCpf(cpf);
      expect(result.isValid).toBe(true);
    });

    it('should generate different CPFs', () => {
      const cpf1 = generateCpf();
      const cpf2 = generateCpf();
      expect(cpf1).not.toBe(cpf2);
    });

    it('should generate formatted CPF', () => {
      const cpf = generateCpf();
      expect(cpf).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
    });
  });
});
