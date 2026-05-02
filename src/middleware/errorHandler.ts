import { Request, Response, NextFunction } from 'express';
import { APIError } from '../types/index';
import logger from '../utils/logger';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: Record<string, unknown>,
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function errorHandler(err: Error | AppError, _req: Request, res: Response, _next: NextFunction): void {
  const timestamp = new Date().toISOString();

  if (err instanceof AppError) {
    logger.error('Application error', {
      code: err.code,
      message: err.message,
      statusCode: err.statusCode,
      details: err.details,
    });

    const response: APIError = {
      code: err.code,
      message: err.message,
      details: err.details,
      timestamp,
    };

    res.status(err.statusCode).json(response);
  } else {
    logger.error('Unexpected error', { message: err.message, stack: err.stack });

    const response: APIError = {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred',
      timestamp,
    };

    res.status(500).json(response);
  }
}

export function asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<void>): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({
    code: 'NOT_FOUND',
    message: 'The requested resource was not found',
    timestamp: new Date().toISOString(),
  });
}
