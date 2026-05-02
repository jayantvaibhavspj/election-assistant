import express, { Express, Request, Response } from 'express';
import { json, urlencoded } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import electionRoutes from './routes/electionRoutes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { requestLogger, corsMiddleware, securityHeaders } from './middleware/index';
import logger from './utils/logger';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Trust proxy
app.set('trust proxy', 1);

// Body parsing middleware
app.use(json({ limit: '10mb' }));
app.use(urlencoded({ limit: '10mb', extended: true }));

// Custom middleware
app.use(requestLogger);
app.use(corsMiddleware);
app.use(securityHeaders);

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// API routes
app.use('/api/election', electionRoutes);

// Main page - serve index.html
app.get('/', (_req: Request, res: Response): void => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, (): void => {
  logger.info(`Election Assistant Server running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
