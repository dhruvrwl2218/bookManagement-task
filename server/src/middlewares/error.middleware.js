import { ApiError } from "../utils/apiError.js  ";

const errorHandler = (err, req, res, next) => {
  // If the error is an instance of your custom ApiError
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message || 'An error occurred',
      errors: err.errors || [],
      stack: process.env.NODE_ENV === 'production' ? undefined : err.stack, // Hide stack in production
    });
  }

  // For any other errors that aren't ApiErrors
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};

export { errorHandler };