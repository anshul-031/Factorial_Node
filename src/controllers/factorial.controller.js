import { logger } from '../utils/logger.js';
import { factorial } from '../utils/factorial.js';

/**
 * Controller for calculating factorial
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const calculateFactorial = (req, res, next) => {
  const requestId = req.id;
  try {
    const rawInput = req.params.number;

    // Input validation: Check if the raw input string represents a non-negative integer
    if (!/^\d+$/.test(rawInput)) {
      logger.warn(`Invalid input: not a non-negative integer string`, { requestId, input: rawInput });
      return res.status(400).json({
        error: 'Invalid input. Please provide a non-negative integer.'
      });
    }

    const number = parseInt(rawInput, 10);
    
    // Log the request
    logger.info(`Factorial calculation requested for number: ${number}`, { requestId });
    
    // Additional check, though regex should cover isNaN for valid number strings
    if (isNaN(number)) {
      logger.warn(`Invalid input: parsed to NaN`, { requestId, input: rawInput });
      return res.status(400).json({
        error: 'Invalid input. Please provide a valid number.'
      });
    }
    
    // The Number.isInteger check is now redundant due to the regex and parseInt,
    // but kept for safety, or if regex changes.
    if (!Number.isInteger(number)) {
      logger.warn(`Invalid input: not an integer after parse`, { requestId, input: number });
      return res.status(400).json({
        error: 'Invalid input. Please provide an integer.'
      });
    }
    
    // Negative number check is still relevant if regex were to allow negative sign
    if (number < 0) {
      logger.warn(`Invalid input: negative number`, { requestId, input: number });
      return res.status(400).json({ 
        error: 'Invalid input. Please provide a positive integer.' 
      });
    }
    
    // Check if number is too large (JavaScript can handle factorials up to ~170)
    if (number > 170) {
      logger.warn(`Number too large for calculation: ${number}`, { requestId });
      return res.status(413).json({ 
        error: 'Number too large. Maximum allowed is 170.' 
      });
    }
    
    // Calculate factorial
    const startTime = process.hrtime();
    const result = factorial(number);
    const endTime = process.hrtime(startTime);
    const calculationTimeMs = (endTime[0] * 1000 + endTime[1] / 1000000).toFixed(3);
    
    // Log successful calculation
    logger.info(`Factorial calculation successful for ${number}`, { 
      requestId, 
      number, 
      calculationTimeMs 
    });
    
    // Return result
    return res.status(200).json({
      number,
      factorial: result,
      calculationTimeMs: parseFloat(calculationTimeMs)
    });
    
  } catch (error) {
    logger.error(`Error calculating factorial: ${error.message}`, { 
      requestId, 
      error: error.message,
      stack: error.stack 
    });
    next(error); // Pass to error handler middleware
  }
};