# 🔥 Checkit - Biblioteca de Validação Brasileira

[![CI/CD](https://github.com/checkit/checkit/workflows/CI/CD/badge.svg)](https://github.com/checkit/checkit/actions)
[![npm version](https://badge.fury.io/js/%40checkit%2Fcore.svg)](https://badge.fury.io/js/%40checkit%2Fcore)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Uma biblioteca completa em TypeScript para validação de dados brasileiros, incluindo CPF, CNPJ, CEP, e-mail, telefone e cartão de crédito. Com API REST pronta para uso e estrutura de monorepo profissional.

## ✨ Características

- ✅ **Validações Completas**: CPF, CNPJ, CEP, e-mail, telefone brasileiro e cartão de crédito
- ✅ **API REST**: Endpoints prontos para validação via HTTP
- ✅ **TypeScript**: Totalmente tipado com interfaces bem definidas
- ✅ **Monorepo**: Estrutura organizada com workspaces
- ✅ **Testes**: Cobertura completa com Jest
- ✅ **CI/CD**: GitHub Actions configurado
- ✅ **Qualidade**: ESLint, Prettier e Husky
- ✅ **Documentação**: README completo e exemplos

## 🚀 Instalação

### Biblioteca Core

```bash
npm install @checkit/core
```

### API REST (opcional)

```bash
npm install @checkit/api
```

## 📦 Estrutura do Projeto

```
checkit/
├── packages/
│   ├── core/          # Biblioteca principal
│   │   ├── src/
│   │   │   ├── validators/  # Validadores
│   │   │   ├── types.ts     # Tipos TypeScript
│   │   │   └── utils.ts     # Utilitários
│   │   └── tests/           # Testes
│   └── api/           # API REST
│       ├── src/
│       │   ├── routes/      # Rotas da API
│       │   └── index.ts     # Servidor Express
│       └── tests/           # Testes da API
├── .github/           # GitHub Actions
├── .husky/            # Git hooks
└── docs/              # Documentação
```

## 🛠️ Uso da Biblioteca

### Validação de CPF

```typescript
import { validateCpf, generateCpf } from '@checkit/core';

// Validar CPF
const result = validateCpf('123.456.789-09');
console.log(result);
// { isValid: true, message: 'CPF válido', value: '123.456.789-09' }

// Gerar CPF válido
const cpf = generateCpf();
console.log(cpf); // '123.456.789-09'
```

### Validação de CNPJ

```typescript
import { validateCnpj, generateCnpj } from '@checkit/core';

// Validar CNPJ
const result = validateCnpj('11.222.333/0001-81');
console.log(result);
// { isValid: true, message: 'CNPJ válido', value: '11.222.333/0001-81' }

// Gerar CNPJ válido
const cnpj = generateCnpj();
console.log(cnpj); // '11.222.333/0001-81'
```

### Validação de E-mail

```typescript
import { validateEmail, generateEmail } from '@checkit/core';

// Validar e-mail
const result = validateEmail('usuario@exemplo.com');
console.log(result);
// { isValid: true, message: 'E-mail válido', value: 'usuario@exemplo.com' }

// Gerar e-mail válido
const email = generateEmail();
console.log(email); // 'abc123@gmail.com'
```

### Validação de Telefone

```typescript
import { validatePhone, generatePhone } from '@checkit/core';

// Validar telefone
const result = validatePhone('(11) 99999-9999');
console.log(result);
// { isValid: true, message: 'Telefone válido', value: '(11) 99999-9999' }

// Gerar telefone válido
const phone = generatePhone();
console.log(phone); // '(11) 99999-9999'
```

### Validação de Cartão de Crédito

```typescript
import { validateCreditCard, generateCreditCard } from '@checkit/core';

// Validar cartão
const result = validateCreditCard('4111111111111111');
console.log(result);
// { isValid: true, message: 'Cartão Visa válido', value: '4111111111111111' }

// Gerar cartão válido
const card = generateCreditCard('Visa');
console.log(card); // '4111111111111111'
```

### Validação Genérica

```typescript
import { validate } from '@checkit/core';

// Validar qualquer tipo
const result = validate({
  type: 'cpf',
  value: '123.456.789-09'
});
console.log(result);
// { isValid: true, message: 'CPF válido', value: '123.456.789-09' }
```

## 🌐 API REST

### Iniciar a API

```bash
# Desenvolvimento
npm run dev:api

# Produção
npm run start:api
```

A API estará disponível em `http://localhost:3000`

### Endpoints Disponíveis

#### Validação de CPF
```bash
POST /api/v1/validate/cpf
Content-Type: application/json

{
  "value": "123.456.789-09",
  "options": {
    "allowEmpty": false
  }
}
```

#### Validação de CNPJ
```bash
POST /api/v1/validate/cnpj
Content-Type: application/json

{
  "value": "11.222.333/0001-81"
}
```

#### Validação de E-mail
```bash
POST /api/v1/validate/email
Content-Type: application/json

{
  "value": "usuario@exemplo.com",
  "options": {
    "allowSubdomains": true,
    "allowInternational": true
  }
}
```

#### Validação Genérica
```bash
POST /api/v1/validate/generic
Content-Type: application/json

{
  "type": "cpf",
  "value": "123.456.789-09"
}
```

#### Geração de Dados Válidos
```bash
GET /api/v1/validate/generate/cpf
GET /api/v1/validate/generate/cnpj
GET /api/v1/validate/generate/email
GET /api/v1/validate/generate/phone
GET /api/v1/validate/generate/credit-card?brand=Visa
```

#### Health Check
```bash
GET /api/v1/health
GET /api/v1/health/detailed
```

### Exemplo de Resposta da API

```json
{
  "success": true,
  "data": {
    "isValid": true,
    "message": "CPF válido",
    "value": "123.456.789-09"
  }
}
```

## 🧪 Testes

```bash
# Executar todos os testes
npm run test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:coverage
```

## 🔧 Desenvolvimento

### Pré-requisitos

- Node.js 18+ 
- npm 8+

### Configuração

```bash
# Clonar o repositório
git clone https://github.com/checkit/checkit.git
cd checkit

# Instalar dependências
npm install

# Configurar Husky
npm run prepare
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Executa API e lib em modo dev
npm run dev:api      # Executa apenas a API
npm run dev:lib      # Executa apenas a lib

# Build
npm run build        # Build de todos os workspaces

# Testes
npm run test         # Executa todos os testes
npm run test:watch   # Executa testes em modo watch

# Qualidade
npm run lint         # Executa ESLint
npm run lint:fix     # Corrige problemas do ESLint
npm run format       # Formata código com Prettier
```

### Estrutura de Desenvolvimento

1. **Core Library** (`packages/core/`): Biblioteca principal com validadores
2. **API** (`packages/api/`): Servidor Express com endpoints REST
3. **Testes**: Cobertura completa para todos os validadores
4. **CI/CD**: GitHub Actions para testes e deploy automático

## 📊 Cobertura de Testes

- ✅ CPF: Validação de dígitos verificadores
- ✅ CNPJ: Validação de dígitos verificadores  
- ✅ CEP: Validação de formato brasileiro
- ✅ E-mail: Validação RFC 5322
- ✅ Telefone: Validação de DDD e formato brasileiro
- ✅ Cartão de Crédito: Algoritmo de Luhn e bandeiras

## 🚀 Deploy

### Publicar no NPM

```bash
# Build do projeto
npm run build

# Publicar core library
npm publish --workspace=@checkit/core --access public

# Publicar API (se necessário)
npm publish --workspace=@checkit/api --access public
```

### Deploy da API

A API pode ser deployada em qualquer plataforma que suporte Node.js:

- **Heroku**: `npm start`
- **Vercel**: Configuração automática
- **Railway**: Deploy direto
- **Docker**: Dockerfile incluído

## 🤝 Contribuindo

Para contribuir com o projeto, consulte nosso [guia de contribuição](CONTRIBUTING.md).

### Processo Básico

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código

- TypeScript strict mode
- ESLint + Prettier
- Testes obrigatórios
- Commits convencionais
- Documentação atualizada

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🆘 Suporte

- 📧 Email: suporte@checkit.com
- 🐛 Issues: [GitHub Issues](https://github.com/checkit/checkit/issues)
- 📖 Documentação: [Wiki](https://github.com/checkit/checkit/wiki)

## 👨‍💻 Autores

### Gabriel Silva Martins
- **Foco**: API REST, rotas e endpoints
- **Contribuições**: 
  - Desenvolvimento da API Express
  - Implementação das rotas de validação
  - Configuração de middleware (CORS, Helmet, Rate Limiting)
  - Health checks e monitoramento
  - Testes da API com Supertest
  - Docker e deploy

### Gabriel Martins (shaw)
- **Foco**: Core da biblioteca e validações avançadas
- **Contribuições**:
  - Algoritmos de validação (CPF, CNPJ, CEP, etc.)
  - Implementação do algoritmo de Luhn para cartões
  - Geração de dados válidos
  - Tipos TypeScript e interfaces
  - Utilitários de formatação
  - Testes unitários completos
  - Estrutura do monorepo

## 🙏 Agradecimentos

- Comunidade TypeScript
- Contribuidores do projeto
- Usuários que reportam bugs e sugerem melhorias

---

**Feito com ❤️ por Gabriel Silva Martins & Gabriel Martins (shaw)**
