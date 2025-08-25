import { ValidationResult, CpfValidationOptions } from '../types';
import { cleanNumeric, formatCpf, generateCpfDigit, isEmpty } from '../utils';

/**
 * Valida um CPF brasileiro
 * @param value - CPF a ser validado
 * @param options - Opções de validação
 * @returns Resultado da validação
 */
export function validateCpf(value: string, options: CpfValidationOptions = {}): ValidationResult {
  const { allowEmpty = false, customMessage } = options;

  // Verifica se está vazio
  if (isEmpty(value)) {
    if (allowEmpty) {
      return { isValid: true, value: '' };
    }
    return {
      isValid: false,
      message: customMessage || 'CPF é obrigatório'
    };
  }

  // Remove caracteres não numéricos
  const cleaned = cleanNumeric(value);

  // Verifica se tem 11 dígitos
  if (cleaned.length !== 11) {
    return {
      isValid: false,
      message: customMessage || 'CPF deve ter 11 dígitos',
      value: cleaned
    };
  }

  // Verifica se todos os dígitos são iguais (CPF inválido)
  if (/^(\d)\1{10}$/.test(cleaned)) {
    return {
      isValid: false,
      message: customMessage || 'CPF inválido',
      value: cleaned
    };
  }

  // Valida primeiro dígito verificador
  const firstNineDigits = cleaned.substring(0, 9);
  const firstDigit = generateCpfDigit(firstNineDigits);
  
  if (parseInt(cleaned[9]) !== firstDigit) {
    return {
      isValid: false,
      message: customMessage || 'CPF inválido',
      value: cleaned
    };
  }

  // Valida segundo dígito verificador
  const firstTenDigits = cleaned.substring(0, 10);
  const secondDigit = generateCpfDigit(firstTenDigits);
  
  if (parseInt(cleaned[10]) !== secondDigit) {
    return {
      isValid: false,
      message: customMessage || 'CPF inválido',
      value: cleaned
    };
  }

  // CPF válido
  const formattedValue = formatCpf(cleaned);
  return {
    isValid: true,
    message: 'CPF válido',
    value: formattedValue
  };
}

/**
 * Gera um CPF válido aleatório
 * @returns CPF válido formatado
 */
export function generateCpf(): string {
  // Gera 9 dígitos aleatórios
  let cpf = '';
  for (let i = 0; i < 9; i++) {
    cpf += Math.floor(Math.random() * 10);
  }

  // Gera primeiro dígito verificador
  const firstDigit = generateCpfDigit(cpf);
  cpf += firstDigit;

  // Gera segundo dígito verificador
  const secondDigit = generateCpfDigit(cpf);
  cpf += secondDigit;

  return formatCpf(cpf);
}
