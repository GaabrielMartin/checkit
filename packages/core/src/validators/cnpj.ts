import { ValidationResult, CnpjValidationOptions } from '../types';
import { cleanNumeric, formatCnpj, generateCnpjDigit, isEmpty } from '../utils';

/**
 * Valida um CNPJ brasileiro
 * @param value - CNPJ a ser validado
 * @param options - Opções de validação
 * @returns Resultado da validação
 */
export function validateCnpj(value: string, options: CnpjValidationOptions = {}): ValidationResult {
  const { allowEmpty = false, customMessage } = options;

  // Verifica se está vazio
  if (isEmpty(value)) {
    if (allowEmpty) {
      return { isValid: true, value: '' };
    }
    return {
      isValid: false,
      message: customMessage || 'CNPJ é obrigatório'
    };
  }

  // Remove caracteres não numéricos
  const cleaned = cleanNumeric(value);

  // Verifica se tem 14 dígitos
  if (cleaned.length !== 14) {
    return {
      isValid: false,
      message: customMessage || 'CNPJ deve ter 14 dígitos',
      value: cleaned
    };
  }

  // Verifica se todos os dígitos são iguais (CNPJ inválido)
  if (/^(\d)\1{13}$/.test(cleaned)) {
    return {
      isValid: false,
      message: customMessage || 'CNPJ inválido',
      value: cleaned
    };
  }

  // Valida primeiro dígito verificador
  const firstTwelveDigits = cleaned.substring(0, 12);
  const firstDigit = generateCnpjDigit(firstTwelveDigits);
  
  if (parseInt(cleaned[12]!) !== firstDigit) {
    return {
      isValid: false,
      message: customMessage || 'CNPJ inválido',
      value: cleaned
    };
  }

  // Valida segundo dígito verificador
  const firstThirteenDigits = cleaned.substring(0, 13);
  const secondDigit = generateCnpjDigit(firstThirteenDigits);
  
  if (parseInt(cleaned[13]!) !== secondDigit) {
    return {
      isValid: false,
      message: customMessage || 'CNPJ inválido',
      value: cleaned
    };
  }

  // CNPJ válido
  const formattedValue = formatCnpj(cleaned);
  return {
    isValid: true,
    message: 'CNPJ válido',
    value: formattedValue
  };
}

/**
 * Gera um CNPJ válido aleatório
 * @returns CNPJ válido formatado
 */
export function generateCnpj(): string {
  // Gera 12 dígitos aleatórios
  let cnpj = '';
  for (let i = 0; i < 12; i++) {
    cnpj += Math.floor(Math.random() * 10);
  }

  // Gera primeiro dígito verificador
  const firstDigit = generateCnpjDigit(cnpj);
  cnpj += firstDigit;

  // Gera segundo dígito verificador
  const secondDigit = generateCnpjDigit(cnpj);
  cnpj += secondDigit;

  return formatCnpj(cnpj);
}
