import { Request, Response } from 'express';
import { AppError } from '@/utils/appError';

export const notFoundHandler = (req: Request, res: Response) => {
  const message = `Resource not found - ${req.originalUrl}`;
  throw new AppError(message, 404);
};
