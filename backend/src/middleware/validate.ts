import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { AppError } from '@/utils/appError';

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error: any) => ({
      field: error.type === 'field' ? error.path : 'unknown',
      message: error.msg
    }));
    
    throw new AppError(`Validation failed: ${errorMessages.map((e: any) => e.message).join(', ')}`, 400);
  }
  
  next();
};
