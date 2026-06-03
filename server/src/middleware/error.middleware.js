
//
// Status codes we use:
//   404 = Not Found (route doesn't exist)
//   500 = Server Error (something broke)
// ============================================

/**
 * 404 Handler - When a route doesn't exist.
 * Example: GET /api/nonexistent → "Route not found"
 */
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};


export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);

  const statusCode = err.statusCode || err.status || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Something went wrong on the server.',
  });
};
