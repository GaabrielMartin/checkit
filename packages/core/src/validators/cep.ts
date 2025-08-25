import { ValidationResult, CepValidationOptions } from '../types';
import { cleanNumeric, formatCep, isEmpty } from '../utils';

/**
 * Valida um CEP brasileiro
 * @param value - CEP a ser validado
 * @param options - Opções de validação
 * @returns Resultado da validação
 */
export function validateCep(value: string, options: CepValidationOptions = {}): ValidationResult {
  const { allowEmpty = false, customMessage } = options;

  // Verifica se está vazio
  if (isEmpty(value)) {
    if (allowEmpty) {
      return { isValid: true, value: '' };
    }
    return {
      isValid: false,
      message: customMessage || 'CEP é obrigatório'
    };
  }

  // Remove caracteres não numéricos
  const cleaned = cleanNumeric(value);

  // Verifica se tem 8 dígitos
  if (cleaned.length !== 8) {
    return {
      isValid: false,
      message: customMessage || 'CEP deve ter 8 dígitos',
      value: cleaned
    };
  }

  // Verifica se todos os dígitos são iguais (CEP inválido)
  if (/^(\d)\1{7}$/.test(cleaned)) {
    return {
      isValid: false,
      message: customMessage || 'CEP inválido',
      value: cleaned
    };
  }

  // CEP válido
  const formattedValue = formatCep(cleaned);
  return {
    isValid: true,
    message: 'CEP válido',
    value: formattedValue
  };
}

/**
 * Gera um CEP válido aleatório
 * @returns CEP válido formatado
 */
export function generateCep(): string {
  // Gera 8 dígitos aleatórios
  let cep = '';
  for (let i = 0; i < 8; i++) {
    cep += Math.floor(Math.random() * 10);
  }

  return formatCep(cep);
}
