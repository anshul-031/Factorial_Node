import express from 'express';
import rateLimit from 'express-rate-limit';
import { calculateFactorial } from '../controllers/factorial.controller.js';

const router = express.Router();

// Rate limiter: 100 requests per minute per IP
const minuteLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after a minute',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

/**
 * Route to calculate factorial of a number
 * @route GET /api/factorial/:number
 */
router.get('/factorial/:number', minuteLimiter, calculateFactorial);

export { router as factorialRoutes };