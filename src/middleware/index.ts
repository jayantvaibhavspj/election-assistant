import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export interface RequestWithId extends Request {
  requestId?: string;
}

export function requestLogger(req: RequestWithId, _res: Response, next: NextFunction): void {
  const requestId = Math.random().toString(36).substr(2, 9);
  req.requestId = requestId;

  logger.info(`Incoming ${req.method} ${req.path}`, {
    requestId,
    query: req.query,
    body: req.body,
  });

  next();
}

export function corsMiddleware(req: Request, res: Response, next: NextFunction): void {
  res.header('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGINS || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
}

export function securityHeaders(_req: Request, res: Response, next: NextFunction): void {
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'DENY');
  res.header('X-XSS-Protection', '1; mode=block');
  res.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  next();
}
