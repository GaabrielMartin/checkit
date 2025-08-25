import { ValidationResult, EmailValidationOptions } from '../types';
import { isEmpty } from '../utils';

/**
 * Valida um endereço de e-mail
 * @param value - E-mail a ser validado
 * @param options - Opções de validação
 * @returns Resultado da validação
 */
export function validateEmail(value: string, options: EmailValidationOptions = {}): ValidationResult {
  const { allowEmpty = false, allowSubdomains = true, allowInternational = true, customMessage } = options;

  // Verifica se está vazio
  if (isEmpty(value)) {
    if (allowEmpty) {
      return { isValid: true, value: '' };
    }
    return {
      isValid: false,
      message: customMessage || 'E-mail é obrigatório'
    };
  }

  // Remove espaços em branco
  const trimmed = value.trim();

  // Regex básica para e-mail
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Regex mais restritiva se não permitir subdomínios
  const strictEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;

  // Regex para e-mails internacionais
  const internationalEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  let isValid = false;

  if (allowInternational) {
    isValid = emailRegex.test(trimmed);
  } else if (allowSubdomains) {
    isValid = emailRegex.test(trimmed);
  } else {
    isValid = strictEmailRegex.test(trimmed);
  }

  if (!isValid) {
    return {
      isValid: false,
      message: customMessage || 'E-mail inválido',
      value: trimmed
    };
  }

  // Validações adicionais
  const [localPart, domain] = trimmed.split('@');

  // Verifica se a parte local não é muito longa
  if (localPart.length > 64) {
    return {
      isValid: false,
      message: customMessage || 'Parte local do e-mail muito longa',
      value: trimmed
    };
  }

  // Verifica se o domínio não é muito longo
  if (domain.length > 253) {
    return {
      isValid: false,
      message: customMessage || 'Domínio do e-mail muito longo',
      value: trimmed
    };
  }

  // Verifica se não começa ou termina com ponto
  if (localPart.startsWith('.') || localPart.endsWith('.') || domain.startsWith('.') || domain.endsWith('.')) {
    return {
      isValid: false,
      message: customMessage || 'E-mail não pode começar ou terminar com ponto',
      value: trimmed
    };
  }

  // E-mail válido
  return {
    isValid: true,
    message: 'E-mail válido',
    value: trimmed.toLowerCase()
  };
}

/**
 * Gera um e-mail válido aleatório
 * @returns E-mail válido
 */
export function generateEmail(): string {
  const domains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'example.com'];
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  const randomName = Math.random().toString(36).substring(2, 10);
  const randomNumber = Math.floor(Math.random() * 1000);
  
  return `${randomName}${randomNumber}@${randomDomain}`;
}
