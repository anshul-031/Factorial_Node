import express from 'express';
import { calculateFactorial } from '../controllers/factorial.controller.js';

const router = express.Router();

/**
 * Route to calculate factorial of a number
 * @route GET /api/factorial/:number
 */
router.get('/factorial/:number', calculateFactorial);

export { router as factorialRoutes };