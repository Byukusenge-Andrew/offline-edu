import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/utils/appError';
import { logger } from '@/utils/logger';
import { config } from '@/config/environment';

interface ErrorResponse {
  status: string;
  message: string;
  stack?: string;
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  logger.error(`${req.method} ${req.originalUrl} - ${err.message}`, {
    error: err.stack,
    body: req.body,
    user: req.user?.id
  });

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new AppError(message, 404);
  }

  // Mongoose duplicate key
  if (err.message.includes('duplicate key error')) {
    const message = 'Duplicate field value entered';
    error = new AppError(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = 'Validation Error';
    error = new AppError(message, 400);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = new AppError(message, 401);
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error = new AppError(message, 401);
  }

  const response: ErrorResponse = {
    status: 'error',
    message: error.message || 'Internal Server Error'
  };

  // Include stack trace in development
  if (config.isDevelopment) {
    response.stack = err.stack;
  }

  const statusCode = (error as AppError).statusCode || 500;
  
  res.status(statusCode).json(response);
};
