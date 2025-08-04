import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to clean up request body for registration
 * Removes empty username field that might be sent by frontend
 */
export const cleanRegistrationBody = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.username === '') {
    delete req.body.username;
  }
  next();
};
