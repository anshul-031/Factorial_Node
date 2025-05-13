import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { v4 as uuidv4 } from 'uuid';

import { logger } from './utils/logger.js';
import { factorialRoutes } from './routes/factorial.routes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/requestLogger.js';

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Add request ID to each request
app.use((req, res, next) => {
  req.id = uuidv4();
  next();
});

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(morgan('combined')); // HTTP request logging
app.use(requestLogger); // Custom request logger

// Routes
app.use('/api', factorialRoutes);

// Root route
app.get('/', (req, res) => {
  logger.info(`Root route accessed`, { requestId: req.id });
  res.json({
    message: 'Factorial API Server',
    documentation: '/api/docs',
    endpoints: {
      calculateFactorial: '/api/factorial/:number'
    }
  });
});

// API documentation route
app.get('/api/docs', (req, res) => {
  logger.info(`Documentation route accessed`, { requestId: req.id });
  res.json({
    endpoints: {
      calculateFactorial: {
        method: 'GET',
        url: '/api/factorial/:number',
        description: 'Calculate the factorial of a number',
        parameters: {
          number: 'The number to calculate factorial for (positive integer)'
        },
        responses: {
          200: {
            description: 'Successful calculation',
            example: {
              number: 5,
              factorial: 120,
              calculationTimeMs: 0.123
            }
          },
          400: {
            description: 'Invalid input',
            example: {
              error: 'Invalid input. Please provide a positive integer.'
            }
          },
          413: {
            description: 'Input too large',
            example: {
              error: 'Number too large. Maximum allowed is 170.'
            }
          },
          500: {
            description: 'Server error',
            example: {
              error: 'Internal server error'
            }
          }
        }
      }
    }
  });
});

// Error handling middleware (must be after routes)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection', { error: err.message, stack: err.stack });
  // In production you might want to gracefully shutdown
  // process.exit(1);
});

export default app;