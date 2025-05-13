# Factorial API Server

A production-ready Node.js API server that calculates factorials of numbers with detailed logging and error handling.

## Features

- RESTful API to calculate factorials
- Comprehensive error handling
- Detailed request/response logging
- Support for multiple concurrent requests
- Input validation
- Performance optimizations for large numbers
- API documentation endpoint
- Postman collection for testing

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/factorial-api.git
   cd factorial-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

For development with auto-restart:
```bash
npm run dev
```

## API Documentation

### Base URL

When running locally: `http://localhost:3000`

### Endpoints

#### Get Factorial

Calculate the factorial of a number.

- **URL**: `/api/factorial/:number`
- **Method**: `GET`
- **URL Parameters**: 
  - `number`: The number to calculate factorial for (positive integer)

**Success Response**:
- **Code**: 200 OK
- **Content Example**:
  ```json
  {
    "number": 5,
    "factorial": 120,
    "calculationTimeMs": 0.123
  }
  ```

**Error Responses**:
- **Code**: 400 Bad Request
  - **Content**: `{ "error": "Invalid input. Please provide a positive integer." }`
- **Code**: 413 Payload Too Large
  - **Content**: `{ "error": "Number too large. Maximum allowed is 170." }`
- **Code**: 500 Internal Server Error
  - **Content**: `{ "error": "Internal server error" }`

### API Documentation Endpoint

The API documentation is available at `/api/docs`.

## Log Files

Logs are stored in the `logs` directory:
- `combined.log`: All logs
- `error.log`: Error logs only

## Performance Considerations

- The API uses an optimized factorial calculation algorithm
- For small numbers (≤20), a recursive approach is used
- For larger numbers, an iterative approach prevents stack overflow
- Numbers larger than 170 are rejected as they exceed JavaScript's numeric precision

## Error Handling

The API includes comprehensive error handling:
- Input validation for non-numbers, non-integers, and negative numbers
- Size limitation (max 170) to prevent overflow
- Global error handler for unexpected errors
- Detailed error logging with stack traces

## Testing with Postman

A Postman collection is included in the `postman` directory. Import this collection into Postman to quickly test the API endpoints.

## License

This project is licensed under the MIT License - see the LICENSE file for details.