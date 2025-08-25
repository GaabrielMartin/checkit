import { ValidationResult, CreditCardValidationOptions } from '../types';
import { cleanNumeric, isEmpty } from '../utils';

interface CreditCardBrand {
  name: string;
  pattern: RegExp;
  lengths: number[];
}

const CREDIT_CARD_BRANDS: CreditCardBrand[] = [
  {
    name: 'Visa',
    pattern: /^4/,
    lengths: [13, 16, 19]
  },
  {
    name: 'Mastercard',
    pattern: /^5[1-5]|^2[2-7]/,
    lengths: [16]
  },
  {
    name: 'American Express',
    pattern: /^3[47]/,
    lengths: [15]
  },
  {
    name: 'Discover',
    pattern: /^6(?:011|5)/,
    lengths: [16, 19]
  },
  {
    name: 'Diners Club',
    pattern: /^3(?:0[0-5]|[68])/,
    lengths: [14, 16, 19]
  },
  {
    name: 'JCB',
    pattern: /^(?:2131|1800|35\d{3})/,
    lengths: [16, 17, 18, 19]
  },
  {
    name: 'Elo',
    pattern: /^(636368|438935|504175|451416|636297)/,
    lengths: [16]
  },
  {
    name: 'Hipercard',
    pattern: /^(606282|3841)/,
    lengths: [16]
  }
];

/**
 * Valida um número de cartão de crédito usando o algoritmo de Luhn
 * @param value - Número do cartão a ser validado
 * @param options - Opções de validação
 * @returns Resultado da validação
 */
export function validateCreditCard(value: string, options: CreditCardValidationOptions = {}): ValidationResult {
  const { allowEmpty = false, allowedBrands, customMessage } = options;

  // Verifica se está vazio
  if (isEmpty(value)) {
    if (allowEmpty) {
      return { isValid: true, value: '' };
    }
    return {
      isValid: false,
      message: customMessage || 'Número do cartão é obrigatório'
    };
  }

  // Remove caracteres não numéricos
  const cleaned = cleanNumeric(value);

  // Verifica se tem pelo menos 13 dígitos
  if (cleaned.length < 13 || cleaned.length > 19) {
    return {
      isValid: false,
      message: customMessage || 'Número do cartão deve ter entre 13 e 19 dígitos',
      value: cleaned
    };
  }

  // Verifica se todos os dígitos são iguais (cartão inválido)
  if (/^(\d)\1{12,18}$/.test(cleaned)) {
    return {
      isValid: false,
      message: customMessage || 'Número do cartão inválido',
      value: cleaned
    };
  }

  // Identifica a bandeira do cartão
  const brand = CREDIT_CARD_BRANDS.find(b => b.pattern.test(cleaned));
  
  if (!brand) {
    return {
      isValid: false,
      message: customMessage || 'Bandeira do cartão não reconhecida',
      value: cleaned
    };
  }

  // Verifica se o comprimento é válido para a bandeira
  if (!brand.lengths.includes(cleaned.length)) {
    return {
      isValid: false,
      message: customMessage || `Número de dígitos inválido para ${brand.name}`,
      value: cleaned
    };
  }

  // Verifica se a bandeira está na lista de permitidas
  if (allowedBrands && allowedBrands.length > 0 && !allowedBrands.includes(brand.name)) {
    return {
      isValid: false,
      message: customMessage || `Bandeira ${brand.name} não é aceita`,
      value: cleaned
    };
  }

  // Aplica o algoritmo de Luhn
  if (!luhnCheck(cleaned)) {
    return {
      isValid: false,
      message: customMessage || 'Número do cartão inválido',
      value: cleaned
    };
  }

  // Cartão válido
  return {
    isValid: true,
    message: `Cartão ${brand.name} válido`,
    value: cleaned
  };
}

/**
 * Implementa o algoritmo de Luhn para validação de cartão de crédito
 * @param number - Número do cartão
 * @returns true se o número é válido
 */
function luhnCheck(number: string): boolean {
  let sum = 0;
  let isEven = false;

  // Percorre os dígitos da direita para a esquerda
  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number[i]!);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

/**
 * Identifica a bandeira do cartão
 * @param value - Número do cartão
 * @returns Nome da bandeira ou null se não reconhecida
 */
export function getCreditCardBrand(value: string): string | null {
  const cleaned = cleanNumeric(value);
  const brand = CREDIT_CARD_BRANDS.find(b => b.pattern.test(cleaned));
  return brand ? brand.name : null;
}

/**
 * Gera um número de cartão válido aleatório
 * @param brand - Bandeira específica (opcional)
 * @returns Número de cartão válido
 */
export function generateCreditCard(brand?: string): string {
  let selectedBrand: CreditCardBrand;

  if (brand) {
    selectedBrand = CREDIT_CARD_BRANDS.find(b => b.name.toLowerCase() === brand.toLowerCase())!;
    if (!selectedBrand) {
      throw new Error(`Bandeira ${brand} não suportada`);
    }
  } else {
    selectedBrand = CREDIT_CARD_BRANDS[Math.floor(Math.random() * CREDIT_CARD_BRANDS.length)]!;
  }

  const length = selectedBrand.lengths[Math.floor(Math.random() * selectedBrand.lengths.length)]!;
  
  // Gera dígitos aleatórios (exceto o último)
  let cardNumber = '';
  for (let i = 0; i < length - 1; i++) {
    cardNumber += Math.floor(Math.random() * 10);
  }

  // Calcula o dígito verificador usando Luhn
  let sum = 0;
  let isEven = false;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i]!);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  const checkDigit = (10 - (sum % 10)) % 10;
  cardNumber += checkDigit;

  return cardNumber;
}
