// Types
export * from './types';

// Utils
export * from './utils';

// Validators
export * from './validators/cpf';
export * from './validators/cnpj';
export * from './validators/cep';
export * from './validators/email';
export * from './validators/phone';
export * from './validators/creditCard';

// Main validation function
import { ValidationResult } from './types';
import { validateCpf } from './validators/cpf';
import { validateCnpj } from './validators/cnpj';
import { validateCep } from './validators/cep';
import { validateEmail } from './validators/email';
import { validatePhone } from './validators/phone';
import { validateCreditCard } from './validators/creditCard';

export interface ValidationOptions {
  type: 'cpf' | 'cnpj' | 'cep' | 'email' | 'phone' | 'creditCard';
  value: string;
  options?: any;
}

/**
 * Função principal de validação que roteia para o validador correto
 * @param validation - Objeto com tipo e valor a ser validado
 * @returns Resultado da validação
 */
export function validate(validation: ValidationOptions): ValidationResult {
  const { type, value, options } = validation;

  switch (type) {
    case 'cpf':
      return validateCpf(value, options);
    case 'cnpj':
      return validateCnpj(value, options);
    case 'cep':
      return validateCep(value, options);
    case 'email':
      return validateEmail(value, options);
    case 'phone':
      return validatePhone(value, options);
    case 'creditCard':
      return validateCreditCard(value, options);
    default:
      return {
        isValid: false,
        message: `Tipo de validação '${type}' não suportado`
      };
  }
}

// Default export
export default {
  validate,
  validateCpf,
  validateCnpj,
  validateCep,
  validateEmail,
  validatePhone,
  validateCreditCard
};
