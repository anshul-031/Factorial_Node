import { logger } from '../utils/logger.js';

/**
 * Global error handling middleware
 */
export const errorHandler = (err, req, res, next) => {
  const requestId = req.id;
  const statusCode = err.statusCode || 500;
  
  // Log the error
  logger.error(`Error handling request: ${err.message}`, {
    requestId,
    statusCode,
    url: req.originalUrl,
    method: req.method,
    error: err.message,
    stack: err.stack
  });
  
  // Send error response to client
  res.status(statusCode).json({
    error: statusCode === 500 ? 'Internal server error' : err.message,
    requestId: process.env.NODE_ENV === 'development' ? requestId : undefined
  });
};