# Contribuindo para o Checkit

## 👨‍💻 Autores do Projeto

### Gabriel Silva Martins
**GitHub**: [@GabrielMartin](https://github.com/GaabrielMartin)

**Foco**: API REST, rotas e endpoints

**Contribuições Principais**:
- ✅ Desenvolvimento da API Express
- ✅ Implementação das rotas de validação
- ✅ Configuração de middleware (CORS, Helmet, Rate Limiting)
- ✅ Health checks e monitoramento
- ✅ Testes da API com Supertest
- ✅ Docker e configuração de deploy
- ✅ Documentação da API

### Gabriel Martins (shaw)
**GitHub**: [@shaw](https://github.com/GabriellMartins)

**Foco**: Core da biblioteca e validações avançadas

**Contribuições Principais**:
- ✅ Algoritmos de validação (CPF, CNPJ, CEP, etc.)
- ✅ Implementação do algoritmo de Luhn para cartões
- ✅ Geração de dados válidos
- ✅ Tipos TypeScript e interfaces
- ✅ Utilitários de formatação
- ✅ Testes unitários completos
- ✅ Estrutura do monorepo
- ✅ CI/CD e GitHub Actions

## 🏗️ Arquitetura do Projeto

### Estrutura de Responsabilidades

```
checkit/
├── packages/
│   ├── core/          # Gabriel Martins (shaw) - Validações
│   │   ├── src/
│   │   │   ├── validators/  # Algoritmos de validação
│   │   │   ├── types.ts     # Tipos TypeScript
│   │   │   └── utils.ts     # Utilitários
│   │   └── tests/           # Testes unitários
│   └── api/           # Gabriel Silva Martins - API REST
│       ├── src/
│       │   ├── routes/      # Rotas da API
│       │   └── index.ts     # Servidor Express
│       └── tests/           # Testes da API
├── .github/           # Gabriel Martins (shaw) - CI/CD
├── .husky/            # Gabriel Martins (shaw) - Git hooks
└── docs/              # Ambos - Documentação
```

## 🤝 Como Contribuir

### Para Novos Contribuidores

1. **Fork o projeto**
2. **Crie uma branch para sua feature**
   ```bash
   git checkout -b feature/NovaFuncionalidade
   ```
3. **Desenvolva seguindo os padrões**
   - TypeScript strict mode
   - ESLint + Prettier
   - Testes obrigatórios
4. **Commit suas mudanças**
   ```bash
   git commit -m 'feat: adiciona nova validação'
   ```
5. **Push para a branch**
   ```bash
   git push origin feature/NovaFuncionalidade
   ```
6. **Abra um Pull Request**

### Padrões de Código

- **TypeScript**: Strict mode habilitado
- **ESLint**: Configuração compartilhada
- **Prettier**: Formatação automática
- **Testes**: Cobertura mínima de 80%
- **Commits**: Convencionais (feat, fix, docs, etc.)

### Áreas de Contribuição

#### Para Validações (Core)
- Novos algoritmos de validação
- Melhorias nos validadores existentes
- Otimizações de performance
- Novos tipos de dados brasileiros

#### Para API (REST)
- Novos endpoints
- Melhorias na documentação
- Otimizações de performance
- Novos middlewares

#### Para Infraestrutura
- CI/CD improvements
- Docker optimizations
- Deploy configurations
- Monitoring enhancements

## 📞 Contato

- **Gabriel Silva Martins**: [@gabrielsilvamartins](https://github.com/gabrielsilvamartins)
- **Gabriel Martins (shaw)**: [@shaw](https://github.com/shaw)

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.
