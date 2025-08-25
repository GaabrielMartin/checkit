/**
 * Remove todos os caracteres não numéricos de uma string
 */
export function cleanNumeric(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Formata CPF no padrão XXX.XXX.XXX-XX
 */
export function formatCpf(value: string): string {
  const cleaned = cleanNumeric(value);
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

/**
 * Formata CNPJ no padrão XX.XXX.XXX/XXXX-XX
 */
export function formatCnpj(value: string): string {
  const cleaned = cleanNumeric(value);
  return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

/**
 * Formata CEP no padrão XXXXX-XXX
 */
export function formatCep(value: string): string {
  const cleaned = cleanNumeric(value);
  return cleaned.replace(/(\d{5})(\d{3})/, '$1-$2');
}

/**
 * Formata telefone brasileiro
 */
export function formatPhone(value: string): string {
  const cleaned = cleanNumeric(value);
  
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  
  return cleaned;
}

/**
 * Valida se uma string está vazia ou é nula
 */
export function isEmpty(value: string | null | undefined): boolean {
  return value === null || value === undefined || value.trim() === '';
}

/**
 * Gera dígito verificador para CPF
 */
export function generateCpfDigit(numbers: string): number {
  let sum = 0;
  let weight = 10;
  
  for (let i = 0; i < numbers.length; i++) {
    sum += parseInt(numbers[i]) * weight;
    weight--;
  }
  
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

/**
 * Gera dígito verificador para CNPJ
 */
export function generateCnpjDigit(numbers: string): number {
  const weights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  
  for (let i = 0; i < numbers.length; i++) {
    sum += parseInt(numbers[i]) * weights[i];
  }
  
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}
