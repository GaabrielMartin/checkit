export interface ValidationResult {
  isValid: boolean;
  message?: string;
  value?: string;
}

export interface ValidationOptions {
  strict?: boolean;
  allowEmpty?: boolean;
  customMessage?: string;
}

export interface CpfValidationOptions extends ValidationOptions {
  format?: 'raw' | 'formatted';
}

export interface CnpjValidationOptions extends ValidationOptions {
  format?: 'raw' | 'formatted';
}

export interface CepValidationOptions extends ValidationOptions {
  format?: 'raw' | 'formatted';
}

export interface EmailValidationOptions extends ValidationOptions {
  allowSubdomains?: boolean;
  allowInternational?: boolean;
}

export interface PhoneValidationOptions extends ValidationOptions {
  format?: 'raw' | 'formatted' | 'international';
  country?: 'BR';
}

export interface CreditCardValidationOptions extends ValidationOptions {
  allowedBrands?: string[];
}
