const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000/api/v1';

// Função helper para fazer requests
async function makeRequest(endpoint, data = null) {
  try {
    const config = {
      method: data ? 'POST' : 'GET',
      url: `${API_BASE_URL}${endpoint}`,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (data) {
      config.data = data;
    }

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`Erro na requisição ${endpoint}:`, error.response?.data || error.message);
    return null;
  }
}

// Exemplos de uso da API
async function examples() {
  console.log('🔥 Exemplos de uso da Checkit API\n');

  // 1. Validação de CPF
  console.log('1. Validação de CPF:');
  const cpfResult = await makeRequest('/validate/cpf', {
    value: '123.456.789-09'
  });
  console.log(cpfResult);
  console.log('');

  // 2. Validação de CNPJ
  console.log('2. Validação de CNPJ:');
  const cnpjResult = await makeRequest('/validate/cnpj', {
    value: '11.222.333/0001-81'
  });
  console.log(cnpjResult);
  console.log('');

  // 3. Validação de E-mail
  console.log('3. Validação de E-mail:');
  const emailResult = await makeRequest('/validate/email', {
    value: 'usuario@exemplo.com',
    options: {
      allowSubdomains: true,
      allowInternational: true
    }
  });
  console.log(emailResult);
  console.log('');

  // 4. Validação de Telefone
  console.log('4. Validação de Telefone:');
  const phoneResult = await makeRequest('/validate/phone', {
    value: '(11) 99999-9999'
  });
  console.log(phoneResult);
  console.log('');

  // 5. Validação de CEP
  console.log('5. Validação de CEP:');
  const cepResult = await makeRequest('/validate/cep', {
    value: '12345-678'
  });
  console.log(cepResult);
  console.log('');

  // 6. Validação de Cartão de Crédito
  console.log('6. Validação de Cartão de Crédito:');
  const cardResult = await makeRequest('/validate/credit-card', {
    value: '4111111111111111'
  });
  console.log(cardResult);
  console.log('');

  // 7. Validação Genérica
  console.log('7. Validação Genérica:');
  const genericResult = await makeRequest('/validate/generic', {
    type: 'cpf',
    value: '123.456.789-09'
  });
  console.log(genericResult);
  console.log('');

  // 8. Geração de CPF
  console.log('8. Geração de CPF:');
  const generatedCpf = await makeRequest('/validate/generate/cpf');
  console.log(generatedCpf);
  console.log('');

  // 9. Geração de CNPJ
  console.log('9. Geração de CNPJ:');
  const generatedCnpj = await makeRequest('/validate/generate/cnpj');
  console.log(generatedCnpj);
  console.log('');

  // 10. Geração de E-mail
  console.log('10. Geração de E-mail:');
  const generatedEmail = await makeRequest('/validate/generate/email');
  console.log(generatedEmail);
  console.log('');

  // 11. Geração de Telefone
  console.log('11. Geração de Telefone:');
  const generatedPhone = await makeRequest('/validate/generate/phone');
  console.log(generatedPhone);
  console.log('');

  // 12. Geração de CEP
  console.log('12. Geração de CEP:');
  const generatedCep = await makeRequest('/validate/generate/cep');
  console.log(generatedCep);
  console.log('');

  // 13. Geração de Cartão de Crédito
  console.log('13. Geração de Cartão de Crédito:');
  const generatedCard = await makeRequest('/validate/generate/credit-card?brand=Visa');
  console.log(generatedCard);
  console.log('');

  // 14. Health Check
  console.log('14. Health Check:');
  const health = await makeRequest('/health');
  console.log(health);
  console.log('');

  // 15. Health Check Detalhado
  console.log('15. Health Check Detalhado:');
  const healthDetailed = await makeRequest('/health/detailed');
  console.log(healthDetailed);
}

// Executar exemplos
examples().catch(console.error);
