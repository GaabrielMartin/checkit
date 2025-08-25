const { 
  validateCpf, 
  validateCnpj, 
  validateEmail, 
  validatePhone,
  validateCep,
  validateCreditCard,
  generateCpf,
  generateCnpj,
  generateEmail,
  generatePhone,
  generateCep,
  generateCreditCard
} = require('@checkit/core');

// Exemplos de validação de CPF
console.log('=== Validação de CPF ===');
console.log(validateCpf('123.456.789-09')); // Válido
console.log(validateCpf('123.456.789-10')); // Inválido
console.log(validateCpf('111.111.111-11')); // Inválido (todos iguais)

// Exemplos de validação de CNPJ
console.log('\n=== Validação de CNPJ ===');
console.log(validateCnpj('11.222.333/0001-81')); // Válido
console.log(validateCnpj('11.222.333/0001-82')); // Inválido

// Exemplos de validação de E-mail
console.log('\n=== Validação de E-mail ===');
console.log(validateEmail('usuario@exemplo.com')); // Válido
console.log(validateEmail('usuario@exemplo')); // Inválido
console.log(validateEmail('invalid-email')); // Inválido

// Exemplos de validação de Telefone
console.log('\n=== Validação de Telefone ===');
console.log(validatePhone('(11) 99999-9999')); // Válido
console.log(validatePhone('(11) 9999-9999')); // Válido
console.log(validatePhone('99999-9999')); // Inválido

// Exemplos de validação de CEP
console.log('\n=== Validação de CEP ===');
console.log(validateCep('12345-678')); // Válido
console.log(validateCep('12345-679')); // Inválido

// Exemplos de validação de Cartão de Crédito
console.log('\n=== Validação de Cartão de Crédito ===');
console.log(validateCreditCard('4111111111111111')); // Visa válido
console.log(validateCreditCard('5555555555554444')); // Mastercard válido
console.log(validateCreditCard('4111111111111112')); // Inválido

// Exemplos de geração de dados válidos
console.log('\n=== Geração de Dados Válidos ===');
console.log('CPF gerado:', generateCpf());
console.log('CNPJ gerado:', generateCnpj());
console.log('E-mail gerado:', generateEmail());
console.log('Telefone gerado:', generatePhone());
console.log('CEP gerado:', generateCep());
console.log('Cartão Visa gerado:', generateCreditCard('Visa'));
console.log('Cartão Mastercard gerado:', generateCreditCard('Mastercard'));
