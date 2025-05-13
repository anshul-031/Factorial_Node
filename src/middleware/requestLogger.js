import { logger } from '../utils/logger.js';

/**
 * Custom middleware to log incoming requests
 */
export const requestLogger = (req, res, next) => {
  const requestId = req.id;
  const startTime = process.hrtime();
  
  // Log request information
  logger.info(`Incoming request`, {
    requestId,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get('user-agent')
  });
  
  // Once response is finished, log response information
  res.on('finish', () => {
    const endTime = process.hrtime(startTime);
    const responseTimeMs = (endTime[0] * 1000 + endTime[1] / 1000000).toFixed(3);
    
    const logLevel = res.statusCode >= 400 ? 'warn' : 'info';
    
    logger[logLevel](`Request completed`, {
      requestId,
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      responseTimeMs: parseFloat(responseTimeMs)
    });
  });
  
  next();
};