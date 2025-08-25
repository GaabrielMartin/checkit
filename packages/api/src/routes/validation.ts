import { Router, Request, Response } from 'express';
import {
  validateCpf,
  validateCnpj,
  validateCep,
  validateEmail,
  validatePhone,
  validateCreditCard,
  generateCpf,
  generateCnpj,
  generateCep,
  generateEmail,
  generatePhone,
  generateCreditCard
} from '@checkit/core';

const router = Router();

// Middleware para validar se o valor foi fornecido
const validateValue = (req: Request, res: Response, next: Function) => {
  const { value } = req.body;
  if (!value || typeof value !== 'string') {
    return res.status(400).json({
      error: 'Bad request',
      message: 'Value is required and must be a string'
    });
  }
  next();
};

// Rota para validação de CPF
router.post('/cpf', validateValue, (req: Request, res: Response) => {
  try {
    const { value, options } = req.body;
    const result = validateCpf(value, options);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Rota para validação de CNPJ
router.post('/cnpj', validateValue, (req: Request, res: Response) => {
  try {
    const { value, options } = req.body;
    const result = validateCnpj(value, options);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Rota para validação de CEP
router.post('/cep', validateValue, (req: Request, res: Response) => {
  try {
    const { value, options } = req.body;
    const result = validateCep(value, options);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Rota para validação de e-mail
router.post('/email', validateValue, (req: Request, res: Response) => {
  try {
    const { value, options } = req.body;
    const result = validateEmail(value, options);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Rota para validação de telefone
router.post('/phone', validateValue, (req: Request, res: Response) => {
  try {
    const { value, options } = req.body;
    const result = validatePhone(value, options);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Rota para validação de cartão de crédito
router.post('/credit-card', validateValue, (req: Request, res: Response) => {
  try {
    const { value, options } = req.body;
    const result = validateCreditCard(value, options);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Rota para validação genérica
router.post('/generic', validateValue, (req: Request, res: Response) => {
  try {
    const { type, value, options } = req.body;
    
    if (!type || !['cpf', 'cnpj', 'cep', 'email', 'phone', 'creditCard'].includes(type)) {
      return res.status(400).json({
        success: false,
        error: 'Bad request',
        message: 'Type must be one of: cpf, cnpj, cep, email, phone, creditCard'
      });
    }

    let result;
    switch (type) {
      case 'cpf':
        result = validateCpf(value, options);
        break;
      case 'cnpj':
        result = validateCnpj(value, options);
        break;
      case 'cep':
        result = validateCep(value, options);
        break;
      case 'email':
        result = validateEmail(value, options);
        break;
      case 'phone':
        result = validatePhone(value, options);
        break;
      case 'creditCard':
        result = validateCreditCard(value, options);
        break;
      default:
        return res.status(400).json({
          success: false,
          error: 'Bad request',
          message: 'Invalid validation type'
        });
    }
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Rotas para geração de dados válidos
router.get('/generate/cpf', (req: Request, res: Response) => {
  try {
    const cpf = generateCpf();
    res.json({
      success: true,
      data: {
        value: cpf,
        message: 'CPF gerado com sucesso'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

router.get('/generate/cnpj', (req: Request, res: Response) => {
  try {
    const cnpj = generateCnpj();
    res.json({
      success: true,
      data: {
        value: cnpj,
        message: 'CNPJ gerado com sucesso'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

router.get('/generate/cep', (req: Request, res: Response) => {
  try {
    const cep = generateCep();
    res.json({
      success: true,
      data: {
        value: cep,
        message: 'CEP gerado com sucesso'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

router.get('/generate/email', (req: Request, res: Response) => {
  try {
    const email = generateEmail();
    res.json({
      success: true,
      data: {
        value: email,
        message: 'E-mail gerado com sucesso'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

router.get('/generate/phone', (req: Request, res: Response) => {
  try {
    const phone = generatePhone();
    res.json({
      success: true,
      data: {
        value: phone,
        message: 'Telefone gerado com sucesso'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

router.get('/generate/credit-card', (req: Request, res: Response) => {
  try {
    const { brand } = req.query;
    const cardNumber = generateCreditCard(brand as string);
    res.json({
      success: true,
      data: {
        value: cardNumber,
        message: 'Cartão de crédito gerado com sucesso'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export { router as validationRoutes };
