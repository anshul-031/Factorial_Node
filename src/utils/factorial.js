/**
 * Calculate factorial of a number
 * @param {number} n - The number to calculate factorial for
 * @returns {number} The factorial result
 */
export const factorial = (n) => {
  // Base cases
  if (n === 0 || n === 1) {
    return 1;
  }
  
  // For small numbers, use recursive approach
  if (n <= 20) {
    return n * factorial(n - 1);
  }
  
  // For larger numbers, use iterative approach to avoid stack overflow
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  
  return result;
};