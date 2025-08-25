import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { validationRoutes } from './routes/validation';
import { healthRoutes } from './routes/health';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de segurança
app.use(helmet());

// Middleware de CORS
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware de compressão
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite de 100 requests por IP
  message: {
    error: 'Too many requests from this IP, please try again later.'
  }
});
app.use(limiter);

// Middleware para parsing JSON
app.use(express.json({ limit: '1mb' }));

// Middleware para logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rotas
app.use('/api/v1/validate', validationRoutes);
app.use('/api/v1/health', healthRoutes);

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    name: 'Checkit API',
    version: '1.0.0',
    description: 'API de validação brasileira',
    endpoints: {
      health: '/api/v1/health',
      validation: '/api/v1/validate'
    },
    documentation: 'https://github.com/checkit/checkit#readme',
    authors: 'Gabriel Silva Martins & Gabriel Martins (shaw)'
  });
});

// Middleware de tratamento de erros
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.originalUrl} not found`
  });
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`🚀 Checkit API running on port ${PORT}`);
  console.log(`📖 Documentation: http://localhost:${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/v1/health`);
});

export default app;
