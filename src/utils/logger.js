import winston from 'winston';

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Create logger
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  defaultMeta: { service: 'factorial-api' },
  transports: [
    // Console transport for all logs
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ level, message, timestamp, requestId, ...metadata }) => {
          let metaStr = '';
          if (Object.keys(metadata).length > 0) {
            if (metadata.service) {
              delete metadata.service;
            }
            if (Object.keys(metadata).length > 0) {
              metaStr = JSON.stringify(metadata);
            }
          }
          return `${timestamp} [${level}]${requestId ? ` [${requestId}]` : ''}: ${message} ${metaStr}`;
        })
      )
    }),
    // File transport for errors
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error',
      maxsize: 10485760, // 10MB
      maxFiles: 5
    }),
    // File transport for all logs
    new winston.transports.File({ 
      filename: 'logs/combined.log',
      maxsize: 10485760, // 10MB
      maxFiles: 5
    })
  ]
});

// Create a stream object for Morgan
export const logStream = {
  write: (message) => {
    logger.info(message.trim());
  }
};