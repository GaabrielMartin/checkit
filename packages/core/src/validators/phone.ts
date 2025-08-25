import { ValidationResult, PhoneValidationOptions } from '../types';
import { cleanNumeric, formatPhone, isEmpty } from '../utils';

/**
 * Valida um número de telefone brasileiro
 * @param value - Telefone a ser validado
 * @param options - Opções de validação
 * @returns Resultado da validação
 */
export function validatePhone(value: string, options: PhoneValidationOptions = {}): ValidationResult {
  const { allowEmpty = false, format = 'formatted', customMessage } = options;

  // Verifica se está vazio
  if (isEmpty(value)) {
    if (allowEmpty) {
      return { isValid: true, value: '' };
    }
    return {
      isValid: false,
      message: customMessage || 'Telefone é obrigatório'
    };
  }

  // Remove caracteres não numéricos
  const cleaned = cleanNumeric(value);

  // Verifica se tem 10 ou 11 dígitos (com DDD)
  if (cleaned.length !== 10 && cleaned.length !== 11) {
    return {
      isValid: false,
      message: customMessage || 'Telefone deve ter 10 ou 11 dígitos',
      value: cleaned
    };
  }

  // Verifica se o DDD é válido (11 a 99)
  const ddd = parseInt(cleaned.substring(0, 2));
  if (ddd < 11 || ddd > 99) {
    return {
      isValid: false,
      message: customMessage || 'DDD inválido',
      value: cleaned
    };
  }

  // Verifica se todos os dígitos são iguais (telefone inválido)
  if (/^(\d)\1{9,10}$/.test(cleaned)) {
    return {
      isValid: false,
      message: customMessage || 'Telefone inválido',
      value: cleaned
    };
  }

  // Telefone válido
  const formattedValue = format === 'formatted' ? formatPhone(cleaned) : cleaned;
  return {
    isValid: true,
    message: 'Telefone válido',
    value: formattedValue
  };
}

/**
 * Gera um telefone válido aleatório
 * @returns Telefone válido formatado
 */
export function generatePhone(): string {
  // DDDs válidos do Brasil
  const validDdds = [
    11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68,
    69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95,
    96, 97, 98, 99
  ];

  const randomDdd = validDdds[Math.floor(Math.random() * validDdds.length)];
  
  // Gera 8 ou 9 dígitos aleatórios (com ou sem 9)
  const hasNine = Math.random() > 0.5;
  const digits = hasNine ? 9 : 8;
  
  let phone = randomDdd.toString();
  for (let i = 0; i < digits; i++) {
    phone += Math.floor(Math.random() * 10);
  }

  return formatPhone(phone);
}
